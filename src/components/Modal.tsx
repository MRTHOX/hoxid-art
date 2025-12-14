'use client';

import React, { useEffect } from 'react';
import { Work } from '@/data/content';

interface ModalProps {
  work: Work;
  onClose: () => void;
}

export default function Modal({ work, onClose }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-white hover:text-red-600 z-10 bg-black bg-opacity-50 w-10 h-10 rounded-full"
          >
            ✕
          </button>
          <video src={work.videoUrl} className="w-full" autoPlay muted loop playsInline />
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-medium">{work.title}</h2>
          <p className="text-sm font-mono text-gray-600 mt-2">{work.year}</p>
          {work.tags && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {work.tags.map((tag) => (
                <span key={tag} className="text-xs font-mono text-gray-500">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}