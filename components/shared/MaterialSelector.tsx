'use client';

import { useState, useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Droplet } from 'lucide-react';
import { Zap } from 'lucide-react';

interface MaterialOption {
  value: string;
  label: string;
  category: string;
}

/**
 * Material selection component with predefined options and custom input
 */
export function MaterialSelector({
  onChange,
  value = [],
  disabled = false,
}: {
  onChange: (materials: string[]) => void;
  value?: string[];
  disabled?: boolean;
}) {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(value || []);
  const [newMaterial, setNewMaterial] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);

  // Predefined material options
  const materialOptions: MaterialOption[] = useMemo(() => [
    // Woods
    { value: 'walnut', label: 'Walnut', category: 'Wood' },
    { value: 'oak', label: 'Oak', category: 'Wood' },
    { value: 'mahogany', label: 'Mahogany', category: 'Wood' },
    { value: 'rosewood', label: 'Rosewood', category: 'Wood' },
    { value: 'cedar', label: 'Cedar', category: 'Wood' },
    { value: 'pine', label: 'Pine', category: 'Wood' },
    { value: 'teak', label: 'Teak', category: 'Wood' },
    { value: 'ebony', label: 'Ebony', category: 'Wood' },
    { value: 'maple', label: 'Maple', category: 'Wood' },
    { value: 'cherry', label: 'Cherry', category: 'Wood' },

    // Metals
    { value: 'brass', label: 'Brass', category: 'Metal' },
    { value: 'copper', label: 'Copper', category: 'Metal' },
    { value: 'iron', label: 'Wrought Iron', category: 'Metal' },
    { value: 'steel', label: 'Steel', category: 'Metal' },
    { value: 'aluminum', label: 'Aluminum', category: 'Metal' },
    { value: 'silver', label: 'Silver', category: 'Metal' },
    { value: 'gold', label: 'Gold (plated/leaf)', category: 'Metal' },

    // Fabrics & Textiles
    { value: 'leather', label: 'Leather', category: 'Fabric' },
    { value: 'velvet', label: 'Velvet', category: 'Fabric' },
    { value: 'silk', label: 'Silk', category: 'Fabric' },
    { value: 'cotton', label: 'Cotton', category: 'Fabric' },
    { value: 'linen', label: 'Linen', category: 'Fabric' },
    { value: 'wool', label: 'Wool', category: 'Fabric' },

    // Other Materials
    { value: 'marble', label: 'Marble', category: 'Stone' },
    { value: 'granite', label: 'Granite', category: 'Stone' },
    { value: 'glass', label: 'Glass', category: 'Other' },
    { value: 'mirror', label: 'Mirror', category: 'Other' },
    { value: 'motherofpearl', label: 'Mother of Pearl', category: 'Other' },
    { value: 'resin', label: 'Resin/Epoxy', category: 'Other' },
  ], []);

  // Group options by category
  const groupedOptions = useMemo(() => {
    const groups: Record<string, MaterialOption[]> = {};
    materialOptions.forEach(option => {
      if (!groups[option.category]) {
        groups[option.category] = [];
      }
      groups[option.category].push(option);
    });
    return groups;
  }, [materialOptions]);

  const handleToggleMaterial = (value: string) => {
    setSelectedMaterials(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );

    // Notify parent of change
    onSetMaterials([...selectedMaterials]);
  };

  const handleAddCustomMaterial = () => {
    const trimmed = newMaterial.trim();
    if (trimmed && !selectedMaterials.includes(trimmed)) {
      setSelectedMaterials(prev => [...prev, trimmed]);
      setNewMaterial('');
      setShowCustomInput(false);

      // Notify parent of change
      onSetMaterials([...selectedMaterials, trimmed]);
    }
  };

  const onSetMaterials = (materials: string[]) => {
    setSelectedMaterials(materials);
    onChange(materials);
  };

  // Initialize with provided value
  // useEffect(() => {
  //   if (value) {
  //     setSelectedMaterials(value);
  //   }
  // }, [value]);

  return (
    <div className="space-y-4">
      <Label htmlFor="materials-select">Materials</Label>
      <p className="text-sm text-muted-foreground mb-3">
        Select materials for your custom piece. You can choose multiple options.
      </p>

      {/* Material categories */}
      <div className="space-y-4">
        {Object.entries(groupedOptions).map(([category, options]) => (
          <div key={category} className="space-y-2">
            <h4 className="text-font-semibold">{category}</h4>
            <div className="grid gap-2 sm:grid-cols-3">
              {options.map(option => (
                <label key={option.value} className="flex items-center space-x-2 p-2 bg-white/50 backdrop-blur-sm rounded border border-border/30 hover:border-border/50 transition-colors cursor-pointer">
                  <Checkbox
                    checked={selectedMaterials.includes(option.value)}
                    onCheckedChange={() => handleToggleMaterial(option.value)}
                    disabled={disabled}
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Custom material input */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            className="flex items-center space-x-1 text-sm font-medium text-primary hover:text-primary/80"
            disabled={disabled}
          >
            {showCustomInput ? (
              <>
                <Minus className="h-4 w-4" />
                <span>Hide custom material</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Add custom material</span>
              </>
            )}
          </button>
          <span className="text-xs text-muted-foreground">
            ({selectedMaterials.length} selected)
          </span>
        </div>

        {showCustomInput && !disabled && (
          <div className="space-y-2">
            <Label htmlFor="custom-material-input">Custom Material</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="custom-material-input"
                placeholder="Enter custom material (e.g., \"Bronze\", \"Fabric type\")"
                value={newMaterial}
                onChange={(e) => setNewMaterial(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddCustomMaterial();
                  }
                }}
                disabled={disabled}
                className="flex-1"
              />
              <button
                onClick={handleAddCustomMaterial}
                disabled={disabled || !newMaterial.trim()}
                className="px-3 py-1.5 text-sm rounded-hover"
              >
                Add
              </button>
            </div>
            {newMaterial.trim() && !selectedMaterials.includes(newMaterial.trim()) && (
              <p className="text-xs text-primary">
                Press Enter to add "{newMaterial.trim()}"
              </p>
            )}
          </div>
        )}
      </div>

      {/* Selected chips */}
      <div className="mt-3 pt-3 border-t border-border/30">
        <h4 className="text-font-semibold mb-2">Selected Materials</h4>
        {selectedMaterials.length === 0 ? (
          <p className="text-sm text-muted-italic">No materials selected</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedMaterials.map((material, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-xs rounded-full bg-primary/20 text-primary font-medium"
              >
                {material}
                <button
                  onClick={() => handleToggleMaterial(material)}
                  className="ml-2 text-xs hover:text-primary/80 p-0.5 rounded"
                  aria-label={`Remove ${material}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}