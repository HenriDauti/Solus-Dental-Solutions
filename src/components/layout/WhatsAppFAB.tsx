import React, { useState } from 'react';
import { X } from 'lucide-react';
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
         <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.168 1.53 5.943L.057 23.5a.5.5 0 0 0 .61.61l5.557-1.473A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.854 0-3.6-.504-5.1-1.38l-.36-.214-3.735.99.99-3.735-.214-.36A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
</svg>
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