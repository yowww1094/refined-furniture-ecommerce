import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zob';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { DimensionInput } from '@/components/shared/DimensionInput';
import { MaterialSelector } from '@/components/shared/MaterialSelector';
import { FilePicker } from '@/components/shared/FilePicker';
import { submitCustomRequest } from '@/lib/actions/custom-requests';
import { z } from 'zod';
import { generateMetadata } from '@/lib/utils/generate-metadata';
import { useRouter } from 'next/navigation';

// Form schema matching our custom request data
const customRequestFormSchema = z.object({
  furnitureType: z.string().min(1, 'Please select a furniture type'),
  dimensions: z.object({
    length: z.number().positive('Please enter a valid length'),
    width: z.number().positive('Please enter a valid width'),
    height: z.number().positive('Please enter a valid height'),
    unit: z.enum(['cm', 'inches']).default('cm'),
  }),
  materials: z.array(z.string()).min(1, 'Please select at least one material'),
  budget: z.object({
    min: z.number().min(0, 'Please enter a valid minimum budget'),
    max: z.number().min(0, 'Please enter a valid maximum budget'),
    currency: z.enum(['USD', 'EUR', 'MAD']).default('MAD'),
  }).refine(data => data.max >= data.min, {
    message: 'Maximum budget must be greater than or equal to minimum budget',
    path: ['max'],
  }),
  description: z.string().min(10, 'Please provide a detailed description'),
  pinterestUrls: z.array(z.string().url().optional()).max(5, 'Maximum 5 Pinterest URLs allowed'),
  files: z.any().optional(), // Will handle file validation separately
});

export type CustomRequestFormValues = z.infer<typeof customRequestFormSchema>;

export const metadata = generateMetadata({
  title: 'Custom Furniture Request - Refined Furniture',
  description: 'Submit your custom furniture request to our artisans. Share your vision, dimensions, materials, and budget for a personalized quote.',
});

export default function CustomRequestForm() {
  const router = useRouter();
  const locale = router.locale;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ error: string | null; success: string | null }>(
    { error: null, success: null }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting: isValidating },
    reset,
  } = useForm<CustomRequestFormValues>({
    resolver: zodResolver(customRequestFormSchema),
    defaultValues: {
      firmwareType: '',
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
        unit: 'cm',
      },
      materials: [],
      budget: {
        min: 0,
        max: 0,
        currency: 'MAD',
      },
      description: '',
      pinterestUrls: [''],
    },
  });

  const onSubmit = async (data: CustomRequestFormValues) => {
    setIsSubmitting(true);

    try {
      // In a real implementation, we would handle file uploads separately
      // For now, we'll simulate the submission
      const response = await submitCustomRequest({
        ...data,
        // Files would be handled separately in a real implementation
      });

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
        <legend className="text-font-semibold mb-2">Dimensions</span></legend>
        <div className="space-y-2">
          <DimensionInput
            {...register('dimensions')}
          />
        </div>
        {errors.dimensions && (
          <p className="text-sm text-destructive">Invalid dimensions</p>
        )}
      </fieldset>

      {/* Materials */}
      <div className="space-y-3">
        <Label htmlFor="materials">Materials (Select all that apply)</Label>
        <div className="space-y-2">
          <MaterialSelector
            {...register('materials')}
          />
        </div>
        {errors.materials && (
          <p className="text-sm text-destructive">{errors.materials.message}</p>
        )}
      </div>

      {/* Budget */}
      <fieldset className="space-y-4">
        <legend className="text-font-semibold mb-2">Budget Range</Legend>
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
          placeholder="Describe your ideal furniture piece, including style preferences, functionality needs, and any special features you envision..."
          rows={6}
          {...register('description')}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Tell us about your vision - the more details you provide, the better we can bring it to life.
        </p>
      </div>

      {/* Pinterest Inspiration */}
      <fieldset className="space-y-4">
        <legend className="text-font-semibold mb-2">Pinterest Inspiration (Optional)</Legend>
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
                // In a full implementation, this would be handled by useFieldArray
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
        <legend className="text-font-semibold mb-2">Upload Reference Images & Files</Legend>
        <p className="text-sm text-muted-foreground mb-2">
          Upload photos of your space, sketches, or other reference files (max 5 files, 10MB each)
        </p>
        <div className="space-y-2">
          <FilePicker
            multiple={true}
            accept="image/*,.pdf,.doc,.docx,.txt"
            maxFiles={5}
            maxSizeMB={10}
            onChange={(files) => {
              // Handle file changes - in a real app, we'd store these temporarily
              // and upload them with the form submission
              console.log('Selected files:', files);
            }}
          />
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