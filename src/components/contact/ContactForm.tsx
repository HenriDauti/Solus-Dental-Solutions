import React, { useState } from 'react';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const services = [
    { value: 'general', label: t('services.general') },
    { value: 'cosmetic', label: t('services.cosmetic') },
    { value: 'orthodontics', label: t('services.orthodontics') },
    { value: 'implants', label: t('services.implants') },
  ];

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.length < 2 ? t('form.errors.nameRequired') : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? t('form.errors.emailInvalid')
          : '';
      case 'phone':
        return !/^[\d\s+()-]+$/.test(value) ? t('form.errors.phoneInvalid') : '';
      case 'message':
        return value.length < 10 ? t('form.errors.messageRequired') : '';
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="relative glass-strong rounded-3xl shadow-2xl overflow-hidden">
      {/* Success Overlay */}
      {isSuccess && (
        <div className="absolute inset-0 z-50 glass-dark backdrop-blur-xl flex items-center justify-center animate-fade-in">
          <div className="text-center space-y-4 animate-scale-in">
            <div className="w-20 h-20 mx-auto gradient-blue-purple rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-bold gradient-text">
              {t('form.success.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('form.success.message')}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
        {/* Form Header */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold gradient-text mb-2">
            {t('form.title')}
          </h3>
          <p className="text-muted-foreground">
            {t('form.subtitle')}
          </p>
        </div>

        {/* Name Field */}
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField('name')}
            onBlur={handleBlur}
            className={`w-full px-4 pt-6 pb-2 rounded-lg border-2 bg-background/50 transition-all duration-300 focus:outline-none ${
              errors.name
                ? 'border-error shake'
                : focusedField === 'name'
                ? 'border-accent shadow-lg shadow-accent/20'
                : 'border-border'
            }`}
            placeholder=" "
          />
          <label
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              formData.name || focusedField === 'name'
                ? 'top-2 text-xs font-medium text-accent'
                : 'top-1/2 -translate-y-1/2 text-base text-muted-foreground'
            }`}
          >
            {t('form.name')}
          </label>
          {errors.name && (
            <div className="flex items-center gap-2 mt-2 text-error text-sm animate-fade-in">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={handleBlur}
            className={`w-full px-4 pt-6 pb-2 rounded-lg border-2 bg-background/50 transition-all duration-300 focus:outline-none ${
              errors.email
                ? 'border-error shake'
                : focusedField === 'email'
                ? 'border-accent shadow-lg shadow-accent/20'
                : 'border-border'
            }`}
            placeholder=" "
          />
          <label
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              formData.email || focusedField === 'email'
                ? 'top-2 text-xs font-medium text-accent'
                : 'top-1/2 -translate-y-1/2 text-base text-muted-foreground'
            }`}
          >
            {t('form.email')}
          </label>
          {errors.email && (
            <div className="flex items-center gap-2 mt-2 text-error text-sm animate-fade-in">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        {/* Phone Field */}
        <div className="relative">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={() => setFocusedField('phone')}
            onBlur={handleBlur}
            className={`w-full px-4 pt-6 pb-2 rounded-lg border-2 bg-background/50 transition-all duration-300 focus:outline-none ${
              errors.phone
                ? 'border-error shake'
                : focusedField === 'phone'
                ? 'border-accent shadow-lg shadow-accent/20'
                : 'border-border'
            }`}
            placeholder=" "
          />
          <label
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              formData.phone || focusedField === 'phone'
                ? 'top-2 text-xs font-medium text-accent'
                : 'top-1/2 -translate-y-1/2 text-base text-muted-foreground'
            }`}
          >
            {t('form.phone')}
          </label>
          {errors.phone && (
            <div className="flex items-center gap-2 mt-2 text-error text-sm animate-fade-in">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.phone}</span>
            </div>
          )}
        </div>

        {/* Service Select */}
        <div className="relative">
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            onFocus={() => setFocusedField('service')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 pt-6 pb-2 rounded-lg border-2 bg-background/50 transition-all duration-300 focus:outline-none appearance-none ${
              focusedField === 'service'
                ? 'border-accent shadow-lg shadow-accent/20'
                : 'border-border'
            }`}
          >
            <option value="">{t('form.selectService')}</option>
            {services.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          <label
            className={`absolute left-4 top-2 text-xs font-medium transition-colors duration-300 pointer-events-none ${
              focusedField === 'service' ? 'text-accent' : 'text-muted-foreground'
            }`}
          >
            {t('form.service')}
          </label>
        </div>

        {/* Message Field */}
        <div className="relative">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField('message')}
            onBlur={handleBlur}
            rows={4}
            className={`w-full px-4 pt-6 pb-2 rounded-lg border-2 bg-background/50 transition-all duration-300 focus:outline-none resize-none ${
              errors.message
                ? 'border-error shake'
                : focusedField === 'message'
                ? 'border-accent shadow-lg shadow-accent/20'
                : 'border-border'
            }`}
            placeholder=" "
          />
          <label
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              formData.message || focusedField === 'message'
                ? 'top-2 text-xs font-medium text-accent'
                : 'top-6 text-base text-muted-foreground'
            }`}
          >
            {t('form.message')}
          </label>
          {errors.message && (
            <div className="flex items-center gap-2 mt-2 text-error text-sm animate-fade-in">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.message}</span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn btn-primary group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t('form.sending')}</span>
            </>
          ) : (
            <>
              <span>{t('form.submit')}</span>
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </>
          )}
        </button>
      </form>

      {/* Shake Animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        .shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;