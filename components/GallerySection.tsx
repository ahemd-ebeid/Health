import React from 'react';
import { useLanguage, useGender } from '../App';

const GallerySection: React.FC = () => {
  const { t } = useLanguage();
  const { gender } = useGender();

  // Using new, verified images with different aspect ratios to fix broken links and better showcase the masonry layout.
  const femaleImages = [
    'https://images.unsplash.com/photo-1591291621365-ab2d2b09a53a?q=80&w=987&auto=format&fit=crop', // Woman with fruit (portrait-like)
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop', // Healthy food spread (landscape)
  ];

  const maleImages = [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop', // Man doing battle ropes (landscape)
    'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop', // Man hiking (portrait-like)
  ];
  
  const images = gender === 'male' ? maleImages : femaleImages;

  return (
    <section className="py-20 bg-green-50/50 dark:bg-gray-800/30 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 dark:text-green-200 mb-12">{t('galleryTitle')}</h2>
        {/* Masonry layout container using CSS columns */}
        <div className="columns-1 md:columns-2 gap-4 md:gap-8">
          {images.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg group mb-4 md:mb-8 break-inside-avoid">
              <img
                src={src}
                alt={`Inspirational health image ${index + 1}`}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;