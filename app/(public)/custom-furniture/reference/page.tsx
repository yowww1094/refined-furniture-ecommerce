import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { submitCustomRequest } from '@/lib/actions/custom-requests';
import { customRequestSchema } from '@/lib/validation/custom-request.schema';

// Custom form reference fields
const referenceFormSchema = z.object({
  // Pre-filled from product reference
  referenceProductId: z.string().optional(),
  referenceProductName: z.string().optional(),

  // Custom request fields
  furnitureType: z.string().min(1, 'Please select a furniture type'),
  dimensions: z.object({
    length: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Please enter a valid length',
    }),
    width: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Please enter a valid width',
    }),
    height: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Please enter a valid height',
    }),
    unit: z.enum(['cm', 'inches']).default('cm'),
  }),
  materials: z.array(z.string()).min(1, 'Please select at least one material'),
  budget: z.object({
    min: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
      message: 'Please enter a valid minimum budget',
    }),
    max: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
      message: 'Please enter a valid maximum budget',
    }),
    currency: z.enum(['USD', 'EUR', 'MAD']).default('MAD'),
  }).refine(data => parseFloat(data.max) >= parseFloat(data.min), {
    message: 'Maximum budget must be greater than or equal to minimum budget',
    path: ['max'],
  }),
  description: z.string().min(10, 'Please provide a detailed description'),
  pinterestUrls: z.array(z.string().url().optional()).max(5, 'Maximum 5 Pinterest URLs allowed'),
  // Note: Files would be handled separately
});

export type ReferenceFormValues = z.infer<typeof referenceFormSchema>;

export default function CustomReferenceForm() {
  const searchParams = useSearchParams();
  const referenceProductId = searchParams.get('productId') || '';
  const referenceProductName = decodeURIComponent(searchParams.get('productName') || '');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ error: string | null; success: string | null }>(
    { error: null, success: null }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting: isValidating },
    reset,
    watch,
    setValue,
  } = useForm<ReferenceFormValues>({
    resolver: zodReferenceFormSchema,
    defaultValues: {
      // Pre-fill with reference data if available
      referenceProductId,
      referenceProductName,
      furnitureType: '',
      dimensions: {
        length: '',
        width: '',
        height: '',
        unit: 'cm',
      },
      materials: [],
      budget: {
        min: '',
        max: '',
        currency: 'MAD',
      },
      description: '',
      pinterestUrls: [''],
    },
  });

  // Auto-fill form based on reference product when it loads
  useEffect(() => {
    if (referenceProductName) {
      // In a real app, we would fetch product details from the database
      // For now, we'll make some educated guesses based on the product name
      const furnitureType = guessFruitTypeFromName(referenceProductName);

      setValue('furnitureType', furnitureType);
      setValue('description', `Custom version of: ${referenceProductName}\n\nPlease customize this design according to your preferences.`);

      // Set reasonable default dimensions based on furniture type
      const dimensions = getDefaultDimensions(furnitureType);
      setValue('dimensions.length', dimensions.length.toString());
      setValue('dimensions.width', dimensions.width.toString());
      setValue('dimensions.height', dimensions.height.toString());
      setValue('dimensions.unit', dimensions.unit);

      // Suggest materials based on furniture type
      const suggestedMaterials = getSuggestedMaterials(furnitureType);
      setValue('materials', suggestedMaterials);

      // Set a reasonable budget range
      const budget = getSuggestedBudget(furnitureType);
      setValue('budget.min', budget.min.toString());
      setValue('budget.max', budget.max.toString());
    }
  }, [referenceProductName, setValue]);

  const onSubmit = async (data: ReferenceFormValues) => {
    setIsSubmitting(true);

    try {
      // Remove reference fields before sending to backend (they're just for UI)
      const { referenceProductId, referenceProductName, ...customRequestData } = data;

      const response = await submitCustomRequest(
        { error: null, success: null } as any,
        Object.entries(customRequestData).reduce((formData, [key, value]) => {
          if (value !== undefined && value !== null) {
            if (typeof value === 'object' && !(value instanceof File)) {
              // Handle nested objects
              Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                formData.append(`${key}[${nestedKey}]`, String(nestedValue));
              });
            } else if (Array.isArray(value)) {
              // Handle arrays
              value.forEach((item, index) => {
                formData.append(`${key}[${index}]`, item);
              });
            } else {
              formData.append(key, String(value));
            }
          }
          return formData;
        }, new FormData())
      );

      if (response.error) {
        setSubmitStatus({ error: response.error, success: null });
      } else {
        setSubmitStatus({ error: null, success: 'Custom request submitted successfully!' });
        // Reset form on success
        reset();
      }
    } catch (error: any) {
      setSubmitStatus({ error: 'An unexpected error occurred. Please try again.', success: null });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-xl">
          {referenceProductName && (
            <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h2 className="text-lg font-semibold mb-2">
                Customizing: {referenceProductName}
              </h2>
              <p className="text-sm text-muted-foreground">
                We'll use this product as inspiration for your custom design
              </p>
            </div>
          )}

          <h1 className="text-2xl font-bold mb-4">
            Create Your Custom Design
          </h1>
          <p className="text-muted-foreground mb-6">
            Start with this design as inspiration and make it uniquely yours
          </p>
        </div>
      </div>

      {/* Reference Info (hidden fields) */}
      <div>
        <input
          type="hidden"
          {...register('referenceProductId')}
        />
        <input
          type="hidden"
          {...register('referenceProductName')}
        />
      </div>

      {/* Furniture Type */}
      <div className="space-y-3">
        <Label htmlFor="furnitureType">Furniture Type</Label>
        <Select
          id="furnitureType"
          {...register('furnitureType')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select furniture type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sofa">Sofa / Sofa Set</SelectItem>
            <SelectItem value="chair">Chair / Armchair</SelectItem>
            <SelectItem value="table">Table (Dining, Coffee, Side)</SelectItem>
            <SelectItem value="bed">Bed / Bedroom Set</SelectItem>
            <SelectItem value="storage">Storage (Cabinet, Wardrobe, Shelves)</SelectItem>
            <SelectItem value="office">Office Furniture</SelectItem>
            <SelectItem value="outdoor">Outdoor Furniture</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.furnitureType && (
          <p className="text-sm text-destructive">{errors.furnitureType.message}</p>
        )}
      </div>

      {/* Dimensions */}
      <fieldset className="space-y-4">
        <legend className="text-font-semibold mb-2">Dimensions</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="length">Length</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="length"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Enter length"
                {...register('dimensions.length')}
              />
              <Select
                id="lengthUnit"
                {...register('dimensions.unit')}
                className="w-20"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">cm</SelectItem>
                  <SelectItem value="inches">inches</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.dimensions?.length && (
              <p className="text-xs text-destructive">{errors.dimensions.length.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="width"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Enter width"
                {...register('dimensions.width')}
              />
              <Select
                id="widthUnit"
                {...register('dimensions.unit')}
                className="w-20"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">cm</SelectItem>
                  <SelectItem value="inches">inches</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.dimensions?.width && (
              <p className="text-xs text-destructive">{errors.dimensions.width.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="height"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Enter height"
                {...register('dimensions.height')}
              />
              <Select
                id="heightUnit"
                {...register('dimensions.unit')}
                className="w-20"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">cm</SelectItem>
                  <SelectItem value="inches">inches</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.dimensions?.height && (
              <p className="text-xs text-destructive">{errors.dimensions.height.message}</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Materials */}
      <div className="space-y-3">
        <Label htmlFor="materials">Materials (Select all that apply)</Label>
        <div className="grid gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="material-wood"
              value="wood"
              {...register('materials')}
            />
            <span className="text-sm">Wood (Walnut, Oak, Cedar, etc.)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="material-metal"
              value="metal"
              {...register('materials')}
            />
            <span className="text-sm">Metal (Iron, Brass, Steel, etc.)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="material-fabric"
              value="fabric"
              {...register('materials')}
            />
            <span className="text-sm">Fabric / Upholstery</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="material-glass"
              value="glass"
              {...register('materials')}
            />
            <span className="text-sm">Glass</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="material-leather"
              value="leather"
              {...register('materials')}
            />
            <span className="text-sm">Leather</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="material-stone"
              value="stone"
              {...register('materials')}
            />
            <span className="text-sm">Stone / Marble</span>
          </div>
        </div>
        {errors.materials && (
          <p className="text-sm text-destructive">{errors.materials.message}</p>
        )}
      </div>

      {/* Budget */}
      <fieldset className="space-y-4">
        <legend className="text-font-semibold mb-2">Budget Range</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="budgetMin">Minimum Budget</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="budgetMin"
                type="number"
                min="0"
                step="1"
                placeholder="Enter minimum"
                {...register('budget.min')}
              />
              <Select
                id="budgetCurrency"
                {...register('budget.currency')}
                className="w-24"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MAD">MAD (Moroccan Dirham)</SelectItem>
                  <SelectItem value="USD">USD (US Dollar)</SelectItem>
                  <SelectItem value="EUR">EUR (Euro)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.budget?.min && (
              <p className="text-xs text-destructive">{errors.budget.min.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="budgetMax">Maximum Budget</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="budgetMax"
                type="number"
                min="0"
                step="1"
                placeholder="Enter maximum"
                {...register('budget.max')}
              />
              <Select
                id="budgetCurrency2"
                {...register('budget.currency')}
                className="w-24"
                disabled
              >
                <SelectTrigger>
                  <SelectValue disabled placeholder="Same as above" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MAD">MAD (Moroccan Dirham)</SelectItem>
                  <SelectItem value="USD">USD (US Dollar)</SelectItem>
                  <SelectItem value="EUR">EUR (Euro)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.budget?.max && (
              <p className="text-xs text-destructive">{errors.budget.max.message}</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Description */}
      <div className="space-y-3">
        <Label htmlFor="description">Description of Your Vision</Label>
        <Textarea
          id="description"
          placeholder="Describe how you'd like to customize this design, including any changes to dimensions, materials, features, or style..."
          rows={6}
          {...register('description')}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      {/* Pinterest Inspiration */}
      <fieldset className="space-y-4">
        <legend className="text-font-semibold mb-2">Pinterest Inspiration (Optional)</legend>
        <p className="text-sm text-muted-foreground mb-2">
          Share up to 5 Pinterest links that inspire your design (optional)
        </p>
        <div className="space-y-2" id="pinterestContainer">
          <div className="flex items-center space-x-2">
            <Input
              id="pinterestUrl1"
              type="url"
              placeholder="https://pin.it/...."
              {...register('pinterestUrls.0')}
            />
            <button
              type="button"
              className="p-1 rounded hover:bg-muted"
              onClick={() => {
                // Add another field - in a real app this would be handled by useFieldArray
                alert('In a full implementation, this would add another URL field');
              }}
            >
              +
            </button>
          </div>
        </div>
        {errors.pinterestUrls && (
          <p className="text-sm text-destructive">{errors.pinterestUrls.message}</p>
        )}
      </fieldset>

      {/* File Upload Section */}
      <fieldset className="space-y-4">
        <legend className="text-font-semibold mb-2">Upload Reference Images & Files</legend>
        <p className="text-sm text-muted-foreground mb-2">
          Upload photos of your space, sketches, or other reference files (max 5 files, 10MB each)
        </p>
        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-success">
          <div className="flex flex-col items-center">
            <Upload className="h-8 w-8 text-success mb-3" />
            <p className="text-sm font-medium">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">
              Supported formats: JPG, PNG, PDF, DOC, ZIP
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Note: File upload handling would be implemented with a proper storage solution in production.
        </p>
      </fieldset>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={isSubmitting || isValidating}
          className="w-full max-w-md"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Custom Request'}
        </Button>
      </div>

      {/* Status Messages */}
      {submitStatus.error && (
        <div className="mt-4 p-4 bg-destructive/50 text-destructive rounded-lg border border-destructive/20">
          <p className="font-medium">Error:</p>
          <p>{submitStatus.error}</p>
        </div>
      )}

      {submitStatus.success && (
        <div className="mt-4 p-4 bg-success/50 text-success rounded-lg border border-success/20">
          <p className="font-medium">Success:</p>
          <p>{submitStatus.success}</p>
        </div>
      )}
    </form>
  );
}

// Helper functions to guess properties from product name
function guessFruitTypeFromName(productName: string): string {
  const lowerName = productName.toLowerCase();

  if (lowerName.includes('sofa') || lowerName.includes('couch') || lowerName.includes('settee')) {
    return 'sofa';
  }
  if (lowerName.includes('chair') || lowerName.includes('armchair') || lowerName.includes('seat')) {
    return 'chair';
  }
  if (lowerName.includes('table')) {
    return 'table';
  }
  if (lowerName.includes('bed') || lowerName.includes('mattress')) {
    return 'bed';
  }
  if (lowerName.includes('cabinet') || lowerName.includes('wardrobe') || lowerName.includes('shelf') ||
      lowerName.includes('dresser') || lowerName.includes('chest')) {
    return 'storage';
  }
  if (lowerName.includes('desk') || lowerName.includes('office')) {
    return 'office';
  }
  if (lowerName.includes('garden') || lowerName.includes('patio') || lowerName.includes('outdoor')) {
    return 'outdoor';
  }

  // Default to 'other' if we can't determine
  return 'other';
}

function getDefaultDimensions(furnitureType: string): {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'inches'
} {
  // Default dimensions in cm
  switch (furnitureType) {
    case 'sofa':
      return { length: 200, width: 90, height: 85, unit: 'cm' };
    case 'chair':
      return { length: 90, width: 90, height: 100, unit: 'cm' };
    case 'table':
      return { length: 180, width: 90, height: 75, unit: 'cm' };
    case 'bed':
      return { length: 200, width: 160, height: 50, unit: 'cm' };
    case 'storage':
      return { length: 120, width: 50, height: 180, unit: 'cm' };
    case 'office':
      return { length: 140, width: 70, height: 75, unit: 'cm' };
    case 'outdoor':
      return { length: 180, width: 80, height: 90, unit: 'cm' };
    default:
      return { length: 100, width: 50, height: 50, unit: 'cm' };
  }
}

function getSuggestedMaterials(furnitureType: string): string[] {
  // Suggested materials based on furniture type
  switch (furnitureType) {
    case 'sofa':
      return ['Wood', 'Fabric'];
    case 'chair':
      return ['Wood', 'Fabric', 'Leather'];
    case 'table':
      return ['Wood', 'Glass', 'Metal'];
    case 'bed':
      return ['Wood', 'Fabric', 'Metal'];
    case 'storage':
      return ['Wood', 'Metal'];
    case 'office':
      return ['Wood', 'Metal', 'Glass'];
    case 'outdoor':
      return ['Metal', 'Teak', 'Rattan'];
    default:
      return ['Wood', 'Fabric'];
  }
}

function getSuggestedBudget(furnitureType: string): { min: number; max: number } {
  // Suggested budget ranges in MAD
  switch (furnitureType) {
    case 'sofa':
      return { min: 3000, max: 15000 };
    case 'chair':
      return { min: 800, max: 5000 };
    case 'table':
      return { min: 1500, max: 10000 };
    case 'bed':
      return { min: 2500, max: 12000 };
    case 'storage':
      return { min: 2000, max: 8000 };
    case 'office':
      return { min: 2000, max: 10000 };
    case 'outdoor':
      return { min: 2000, max: 15000 };
    default:
      return { min: 1000, max: 5000 };
  }
}