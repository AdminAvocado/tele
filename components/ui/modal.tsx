'use client';

import { X } from 'lucide-react';
import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  meetingUrl?: string;
}

export function Modal({ isOpen, onClose, children, meetingUrl }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] relative">
        <button 
          onClick={onClose}
          className="absolute -right-3 -top-3 bg-white rounded-full p-1 shadow-lg z-[1001]"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        
        {meetingUrl ? (
          <iframe 
            src={meetingUrl} 
            className="w-full h-full rounded-lg"
            allow="camera; microphone; fullscreen; display-capture"
            title="Meeting"
          />
        ) : (
          <div className="p-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
