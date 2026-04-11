"use client";

import { useState } from 'react';
import { Container } from './Container';
import { SectionTitle } from './SectionTitle';

export function PhotoUploadSection() {
  const [photos, setPhotos] = useState<{ id: number; url: string }[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setPhotos((prev) => [
            ...prev,
            { id: Date.now() + Math.random(), url: result }
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <section className="section-shell section-spacing">
      <Container>
        <SectionTitle
          eyebrow="Subir fotos"
          title="Comparte tus fotos favoritas"
          description="Elegí una o más imágenes desde tu dispositivo para mostrarlas aquí."
          centered
        />
        <div className="mt-8">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="mb-6 block text-sm text-cocoa"
          />
          {photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <img
                  key={photo.id}
                  src={photo.url}
                  alt="Foto subida"
                  className="w-full rounded-lg shadow-soft object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}