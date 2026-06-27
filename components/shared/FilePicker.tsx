'use client';

import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { Folder } from 'lucide-react';
import { Image } from 'lucide-react';
import { Paperclip } from 'lucide-react';

interface FilePreview {
  file: File;
  preview: string;
  type: 'image' | 'document';
  size: string;
}

/**
 * File upload component with preview, validation, and basic client-side compression for images
 */
export function FilePicker({
  multiple = true,
  accept = 'image/*,.pdf,.doc,.docx,.txt',
  maxFiles = 10,
  maxSizeMB = 10,
  onChange,
}: {
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  onChange: (files: File[]) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<FilePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate file
  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file type
    const allowedTypes = accept.split(',').map(type => type.trim());
    const isTypeValid = allowedTypes.some(type =>
      type.startsWith('image/') ? file.type.startsWith('image/') : file.type === type || file.name.endsWith(type.replace('.', ''))
    );

    if (!isTypeValid) {
      return {
        valid: false,
        error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`
      };
    }

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return {
        valid: false,
        error: `File too large. Maximum size is ${maxSizeMB}MB.`
      };
    }

    return { valid: true };
  };

  // Generate preview for file
  const generatePreview = async (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Compress image (simple client-side compression)
  const compressImage = async (file: File, maxWidth = 1920, maxHeight = 1080, quality = 0.8): Promise<File> => {
    return new Promise<File>((resolve) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to blob
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now()
                });
                resolve(compressedFile);
              } else {
                resolve(file); // Fallback to original if compression fails
              }
            },
            file.type,
            quality
          );
        } else {
          resolve(file); // Fallback to original if canvas not available
        }
      };
      img.onerror = () => {
        resolve(file); // Fallback to original if image fails to load
      };
      img.src = URL.createObjectURL(file);
    });
  };

  // Handle file selection
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    await processFiles(selectedFiles);
    e.target.value = ''; // Reset input
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Handle drop
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      await processFiles(droppedFiles);
    }
  };

  // Process files (validate, optionally compress, update state)
  const processFiles = async (newFiles: File[]) => {
    setError(null);

    // Check if we're at max files
    if (files.length + newFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed. You currently have ${files.length} files.`);
      return;
    }

    // Process each file
    const validFiles: File[] = [];
    const invalidFiles: Array<{ file: File; error: string }> = [];

    for (const file of newFiles) {
      const validation = validateFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        invalidFiles.push({ file, error: validation.error || 'Unknown error' });
      }
    }

    // Show errors for invalid files
    if (invalidFiles.length > 0) {
      setError(invalidFiles.map(f => `${f.file.name}: ${f.error}`).join('\n'));
    }

    // For images, optionally compress them
    const processedFiles = await Promise.all(
      validFiles.map(async (file) => {
        if (file.type.startsWith('image/')) {
          // Compress image
          return await compressImage(file);
        }
        return file; // Return non-image files as-is
      })
    );

    // Update state
    const newFilesList = [...files, ...processedFiles];
    setFiles(newFilesList);

    // Generate previews
    const previewsPromises = processedFiles.map(async (file) => {
      const preview = await generatePreview(file);
      return {
        file,
        preview,
        type: file.type.startsWith('image/') ? 'image' : 'document',
        size: `${(file.size / 1024).toFixed(1)} ${file.size >= 1024 * 1024 ? 'MB' : 'KB'}`
      };
    });

    const newPreviews = [...previews, ...(await Promise.all(previewsPromises))];
    setPreviews(newPreviews);

    // Call onChange callback
    onChange(newFilesList);
  };

  // Remove file
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));

    // Call onChange with updated files
    onChange([...files].filter((_, i) => i !== index));
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Drag and drop area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${isDragging ? 'border-primary bg-primary/5' : 'border-border/30 hover:border-border/50'}`}
        role="button"
        tabIndex={0}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        {/* Hidden file input */}
        <input
          type="file"
          id="file-input"
          multiple={multiple}
          accept={accept}
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />

        <div className="space-y-3">
          <div className="flex items-center justify-center mb-3">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <p className="text-sm font-medium">
            {multiple ? 'Drag & drop files here or click to upload' : 'Drag & drop file here or click to upload'}
          </p>
          <p className="text-xs text-muted-foreground">
            {multiple
              ? `Max ${maxFiles} files, ${maxSizeMB}MB each`
              : `Max ${maxSizeMB}File size`}
            <br />
            Accepted: {accept.split(',').map(t => t.trim()).join(', ')}
          </p>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-start space-x-3 rounded-md border p-4 bg-destructive/50 text-destructive">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium">Error:</h3>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* File previews */}
      {previews.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-font-semibold">Selected Files ({previews.length}/{maxFiles})</h3>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setFiles([]);
                setPreviews([]);
                onChange([]);
              }}
            >
              <Archive className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {previews.map((preview, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                {/* File icon/preview */}
                <div className="flex-shrink-0">
                  {preview.type === 'image' ? (
                    <img
                      src={preview.preview}
                      alt={`${preview.file.name} preview`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center bg-muted/20 rounded-lg">
                      {preview.file.type === 'application/pdf' ? (
                        <Picture className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <DocumentText className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  )}
                </div>

                {/* File info */}
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium truncate" title={preview.file.name}>
                      {preview.file.name}
                    </h4>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {preview.size} • {preview.file.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}