import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Check, AlertCircle, Loader2, CalendarCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

const EMAILJS_SERVICE_ID  = 'service_m7rsebc';
const EMAILJS_TEMPLATE_ID = 'template_kubbt8t';
const EMAILJS_PUBLIC_KEY  = 'ZZVjMHVPRlQK799al';

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
  const { language } = useLanguage();
  const t = translations[language];
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [errors, setErrors]             = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess]       = useState(false);
  const [sendError, setSendError]       = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const services = [
    { value: 'general',      label: t.services.general },
    { value: 'cosmetic',     label: t.services.cosmetic },
    { value: 'orthodontics', label: t.services.orthodontics },
    { value: 'implants',     label: t.services.implants },
  ];

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':    return value.length < 2 ? t.form.errors.nameRequired : '';
      case 'email':   return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? t.form.errors.emailInvalid : '';
      case 'phone':   return !/^[\d\s+()-]+$/.test(value) ? t.form.errors.phoneInvalid : '';
      case 'message': return value.length < 10 ? t.form.errors.messageRequired : '';
      default:        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSendError(null);
    if (errors[name]) {
      setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) setErrors((prev) => ({ ...prev, [name]: error }));
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setIsSubmitting(true);
    setSendError(null);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone:      formData.phone,
          service:    formData.service || '—',
          message:    formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setSendError(t.form.errors.sendFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Success state ── */
  if (isSuccess) {
    return (
      <div className="glass-strong rounded-3xl shadow-2xl overflow-hidden p-8 md:p-12 animate-fade-in">
        <div className="flex flex-col items-center text-center gap-6 py-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full gradient-blue-purple flex items-center justify-center shadow-xl animate-pulse-glow">
              <Check className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
            <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-accent/30 scale-125 animate-ping opacity-20" />
          </div>
          <div className="space-y-2 max-w-sm">
            <h3 className="text-2xl font-bold gradient-text">{t.form.success.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{t.form.success.message}</p>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-accent/5 border border-accent/20 text-sm text-muted-foreground">
            <CalendarCheck className="w-5 h-5 text-accent flex-shrink-0" />
            <span>{t.form.willReply}</span>
          </div>
          <button onClick={() => setIsSuccess(false)} className="btn btn-secondary text-sm">
            {t.form.anotherMessage}
          </button>
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="relative glass-strong rounded-3xl shadow-2xl overflow-hidden">
      <form ref={formRef} onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">

        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold gradient-text mb-2">{t.form.title}</h3>
          <p className="text-muted-foreground">{t.form.subtitle}</p>
        </div>

        {sendError && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm animate-fade-in">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{sendError}</span>
          </div>
        )}

        {/* Name */}
        <div className="relative">
          <input
            type="text" name="name" value={formData.name}
            onChange={handleChange} onFocus={() => setFocusedField('name')} onBlur={handleBlur}
            className={`w-full px-4 pt-6 pb-2 rounded-lg border-2 bg-background/50 transition-all duration-300 focus:outline-none ${
              errors.name ? 'border-error shake'
              : focusedField === 'name' ? 'border-accent shadow-lg shadow-accent/20'
              : 'border-border'}`}
            placeholder=" "
          />
          <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
            formData.name || focusedField === 'name'
              ? 'top-2 text-xs font-medium text-accent'
              : 'top-1/2 -translate-y-1/2 text-base text-muted-foreground'}`}>
            {t.form.name}
          </label>
          {errors.name && (
            <div className="flex items-center gap-2 mt-2 text-error text-sm animate-fade-in">
              <AlertCircle className="w-4 h-4" /><span>{errors.name}</span>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email" name="email" value={formData.email}
            onChange={handleChange} onFocus={() => setFocusedField('email')} onBlur={handleBlur}
            className={`w-full px-4 pt-6 pb-2 rounded-lg border-2 bg-background/50 transition-all duration-300 focus:outline-none ${
              errors.email ? 'border-error shake'
              : focusedField === 'email' ? 'border-accent shadow-lg shadow-accent/20'
              : 'border-border'}`}
            placeholder=" "
          />
          <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
            formData.email || focusedField === 'email'
              ? 'top-2 text-xs font-medium text-accent'
              : 'top-1/2 -translate-y-1/2 text-base text-muted-foreground'}`}>
            {t.form.email}
          </label>
          {errors.email && (
            <div className="flex items-center gap-2 mt-2 text-error text-sm animate-fade-in">
              <AlertCircle className="w-4 h-4" /><span>{errors.email}</span>
            </div>
          )}
        </div>

        {/* Phone */}
        <div className="relative">
          <input
            type="tel" name="phone" value={formData.phone}
            onChange={handleChange} onFocus={() => setFocusedField('phone')} onBlur={handleBlur}
            className={`w-full px-4 pt-6 pb-2 rounded-lg border-2 bg-background/50 transition-all duration-300 focus:outline-none ${
              errors.phone ? 'border-error shake'
              : focusedField === 'phone' ? 'border-accent shadow-lg shadow-accent/20'
              : 'border-border'}`}
            placeholder=" "
          />
          <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
            formData.phone || focusedField === 'phone'
              ? 'top-2 text-xs font-medium text-accent'
              : 'top-1/2 -translate-y-1/2 text-base text-muted-foreground'}`}>
            {t.form.phone}
          </label>
          {errors.phone && (
            <div className="flex items-center gap-2 mt-2 text-error text-sm animate-fade-in">
              <AlertCircle className="w-4 h-4" /><span>{errors.phone}</span>
            </div>
          )}
        </div>

        {/* Service */}
        <div className="relative">
          <select
            name="service" value={formData.service}
            onChange={handleChange} onFocus={() => setFocusedField('service')} onBlur={() => setFocusedField(null)}
            className={`w-full px-4 pt-6 pb-2 rounded-lg border-2 bg-background/50 transition-all duration-300 focus:outline-none appearance-none ${
              focusedField === 'service' ? 'border-accent shadow-lg shadow-accent/20' : 'border-border'}`}
          >
            <option value="">{t.form.selectService}</option>
            {services.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <label className={`absolute left-4 top-2 text-xs font-medium transition-colors duration-300 pointer-events-none ${
            focusedField === 'service' ? 'text-accent' : 'text-muted-foreground'}`}>
            {t.form.service}
          </label>
        </div>

        {/* Message */}
        <div className="relative">
          <textarea
            name="message" value={formData.message} rows={4}
            onChange={handleChange} onFocus={() => setFocusedField('message')} onBlur={handleBlur}
            className={`w-full px-4 pt-6 pb-2 rounded-lg border-2 bg-background/50 transition-all duration-300 focus:outline-none resize-none ${
              errors.message ? 'border-error shake'
              : focusedField === 'message' ? 'border-accent shadow-lg shadow-accent/20'
              : 'border-border'}`}
            placeholder=" "
          />
          <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
            formData.message || focusedField === 'message'
              ? 'top-2 text-xs font-medium text-accent'
              : 'top-6 text-base text-muted-foreground'}`}>
            {t.form.message}
          </label>
          {errors.message && (
            <div className="flex items-center gap-2 mt-2 text-error text-sm animate-fade-in">
              <AlertCircle className="w-4 h-4" /><span>{errors.message}</span>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit" disabled={isSubmitting}
          className="w-full btn btn-primary group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <><Loader2 className="w-5 h-5 animate-spin" /><span>{t.form.sending}</span></>
          ) : (
            <><span>{t.form.submit}</span>
            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" /></>
          )}
        </button>
      </form>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25%       { transform: translateX(-10px); }
          75%       { transform: translateX(10px); }
        }
        .shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
};

export default ContactForm;