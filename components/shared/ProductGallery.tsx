import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageItem {
  src: string;
  alt: string;
}

interface ProductGalleryProps {
  images: ImageItem[];
  defaultIndex?: number;
}

export function ProductGallery({ images, defaultIndex = 0 }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const setImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative w-full">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          objectFit="contain"
          className="rounded-lg"
        />
        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex flex-col items-center justify-between p-4 pointer-events-none">
          <button
            onClick={goToPrev}
            className="p-2 rounded-hover bg-white/50 hover:bg-white/70 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 text-foreground/70" />
          </button>
          <button
            onClick={goToNext}
            className="p-2 rounded-hover bg-white/50 hover:bg-white/70 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 text-foreground/70" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setImage(index)}
              className={`flex-shrink-0 border border-transparent rounded-md p-1 ${
                currentIndex === index
                  ? 'border-accent/50 bg-accent/50'
                  : 'hover:border-muted hover:bg-muted/50'
              }`}
              aria-label={`Image ${index + 1}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={80}
                height={80}
                objectFit="cover"
                className="rounded-md"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}