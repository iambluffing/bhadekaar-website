import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/918806180088"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group focus:outline-none"
      aria-label="Chat with BhadeKaar on WhatsApp"
    >
      <MessageCircle size={22} className="fill-current stroke-emerald-500" />
      <span className="font-display font-bold text-xs sm:text-sm tracking-wide pr-1">
        Book on WhatsApp
      </span>
    </a>
  );
};
