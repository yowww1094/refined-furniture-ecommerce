'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ruler } from 'lucide-react';
import { ArrowUpDown } from 'lucide-react';

interface DimensionFieldProps {
  label: string;
  unit: 'cm' | 'inches';
  onChange: (value: { value: number; unit: 'cm' | 'inches' }) => void;
  value?: { value: number; unit: 'cm' | 'inches' };
  disabled?: boolean;
}

/**
 * Dimension input field with value and unit selector
 */
export function DimensionField({
  label,
  unit: initialUnit = 'cm',
  onChange,
  value,
  disabled = false,
}: DimensionFieldProps) {
  const [unit, setUnit] = useState<'cm' | 'inches'>(initialUnit);
  const [inputValue, setInputValue] = useState<string>(value?.value?.toString() || '');

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const numValue = parseFloat(e.target.value);
    if (!isNaN(numValue)) {
      onChange({ value: numValue, unit });
    } else if (e.target.value === '') {
      onChange({ value: 0, unit }); // Allow empty to be handled by validation
    }
  };

  const handleUnitChange = (value: string) => {
    setUnit(value as 'cm' | 'inches');
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      onChange({ value: numValue, unit: value as 'cm' | 'inches' });
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={`${label.toLowerCase().replace(/\s+/g, '-')}-dim`}>
        {label}
      </Label>
      <div className="flex items-center space-x-2">
        <Input
          id={`${label.toLowerCase().replace(/\s+/g, '-')}-dim`}
          type="number"
          min="0.1"
          step="0.1"
          placeholder="Enter value"
          value={inputValue}
          onChange={handleValueChange}
          disabled={disabled}
          className="flex-1"
        />
        <Select
          id={`${label.toLowerCase().replace(/\s+/g, '-')}-unit`}
          value={unit}
          onValueChange={handleUnitChange}
          disabled={disabled}
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
    </div>
  );
}

/**
 * Group of dimension fields (L x W x H)
 */
export interface DimensionsValue {
  length: { value: number; unit: 'cm' | 'inches' };
  width: { value: number; unit: 'cm' | 'inches' };
  height: { value: number; unit: 'cm' | 'inches' };
}

interface DimensionsGroupProps {
  onChange: (dimensions: DimensionsValue) => void;
  value?: DimensionsValue;
  disabled?: boolean;
}

/**
 * Group of dimension fields for length, width, and height
 */
export function DimensionsGroup({
  onChange,
  value,
  disabled = false,
}: DimensionsGroupProps) {
  const [dimensions, setDimensions] = useState<DimensionsValue>({
    length: { value: 0, unit: 'cm' },
    width: { value: 0, unit: 'cm' },
    height: { value: 0, unit: 'cm' },
  });

  // Initialize with provided value
  if (value) {
    setDimensions(value);
  }

  const handleDimensionChange = (dimension: keyof DimensionsValue, newValue: { value: number; unit: 'cm' | 'inches' }) => {
    setDimensions(prev => ({
      ...prev,
      [dimension]: newValue
    }));

    // Call parent onChange with updated dimensions
    onSetDimensions({ ...dimensions, [dimension]: newValue });
  };

  const onSetDimensions = (updatedDimensions: DimensionsValue) => {
    onChange(updatedDimensions);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <DimensionField
          label="Length"
          unit={dimensions.length.unit}
          value={dimensions.length.value > 0 ? dimensions.length : undefined}
          onChange={(val) => handleDimensionChange('length', val)}
          disabled={disabled}
        />

        <DimensionField
          label="Width"
          unit={dimensions.width.unit}
          value={dimensions.width.value > 0 ? dimensions.width : undefined}
          onChange={(val) => handleDimensionChange('width', val)}
          disabled={disabled}
        />

        <DimensionField
          label="Height"
          unit={dimensions.height.unit}
          value={dimensions.height.value > 0 ? dimensions.height : undefined}
          onChange={(val) => handleDimensionChange('height', val)}
          disabled={disabled}
        />
      </div>

      {/* Visual representation */}
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-24 h-4 bg-border/50 rounded relative">
            {/* Width indicator */}
            <div className="absolute left-0 top-0 h-full w-[calc(var(--width)*1px)] bg-primary/20"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-4 h-24 bg-border/50 rounded relative mb-2">
              {/* Height indicator */}
              <div className="absolute bottom-0 left-0 w-full h-[calc(var(--height)*1px)] bg-primary/20"></div>
            </div>
            <span className="block text-xs">{dimensions.height.value > 0 ? `${dimensions.height.value}${dimensions.height.unit === 'cm' ? 'cm' : '"'}` : '--'}</span>
          </div>
          <div className="w-24 h-4 bg-border/50 rounded relative">
            {/* Depth indicator */}
            <div className="absolute left-0 top-0 h-full w-[calc(var(--width)*1px)] bg-primary/20"></div>
          </div>
        </div>
        <p className="mt-2 text-xs">L × W × H</p>
      </div>
    </div>
  );
}