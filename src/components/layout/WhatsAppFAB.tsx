import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const WhatsAppFAB: React.FC = () => {
  const { t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = '355697707078';
  const message = encodeURIComponent(t('whatsapp.message'));

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      <div
        className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${
          showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="glass-strong px-4 py-3 rounded-lg shadow-xl min-w-[200px] animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              {t('whatsapp.tooltip.status')}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {t('whatsapp.tooltip.message')}
          </p>
          {/* Arrow */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white/80 backdrop-blur-sm rotate-45" />
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative w-16 h-16 rounded-full shadow-2xl overflow-hidden transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95 gpu-accelerate"
        aria-label="Chat on WhatsApp"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-teal-500" />
        
        {/* Glow Effect */}
        <div className="absolute inset-0 shadow-lg shadow-green-500/50 group-hover:shadow-2xl group-hover:shadow-green-500/70 transition-all duration-300" />
        
        {/* Pulse Ring */}
        <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-green-400" />
        
        {/* Icon Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          <MessageCircle className="w-8 h-8 text-white" strokeWidth={2} />
        </div>
        
        {/* Ripple Effect on Click */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 group-active:animate-ping" />
      </button>

      {/* Notification Badge */}
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
        <span className="text-xs font-bold text-white">1</span>
      </div>
    </div>
  );
};

export default WhatsAppFAB;