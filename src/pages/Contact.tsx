import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, MessageCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name) tempErrors.name = 'Name is required';
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email';
    }
    if (!formData.phone) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      tempErrors.phone = 'Please provide a valid 10-digit mobile number';
    }
    if (!formData.message) tempErrors.message = 'Message cannot be empty';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'general',
          message: '',
        });
      }, 5000);
    }
  };

  return (
    <div className="w-full space-y-16 pb-20 text-left">
      {/* 1. Header Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 md:py-20 diagonal-bg text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-cyan-500/10 dark:text-cyan-400">
            <MessageSquare size={12} /> Direct Support
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
            Contact BhadeKaar
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-450 max-w-xl mx-auto leading-relaxed">
            Get in touch for commercial goods transport, truck driver partner registration, or bulk freight quotes in Goa.
          </p>
        </div>
      </section>

      {/* 2. Grid of Contacts & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Contact Info Details */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Official Business Contact
            </h3>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-2xl bg-primary/5 text-primary dark:bg-cyan-500/10 dark:text-cyan-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="block font-bold text-xs text-slate-400 uppercase tracking-widest">Business Location</span>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-0.5 font-semibold">
                    Goa, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-2xl bg-primary/5 text-primary dark:bg-cyan-500/10 dark:text-cyan-400">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="block font-bold text-xs text-slate-400 uppercase tracking-widest">Phone Number</span>
                  <a href="tel:8806180088" className="text-sm text-slate-700 dark:text-slate-300 mt-0.5 font-semibold hover:text-primary dark:hover:text-cyan-400 block">
                    8806180088
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-2xl bg-primary/5 text-primary dark:bg-cyan-500/10 dark:text-cyan-400">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="block font-bold text-xs text-slate-400 uppercase tracking-widest">Official Email</span>
                  <a href="mailto:info@bhadekaar.com" className="text-sm text-slate-700 dark:text-slate-300 mt-0.5 font-semibold hover:text-primary dark:hover:text-cyan-400 block">
                    info@bhadekaar.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <span className="block font-bold text-xs text-slate-400 uppercase tracking-widest">WhatsApp Direct</span>
                  <a
                    href="https://wa.me/918806180088"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-emerald-600 dark:text-emerald-400 mt-0.5 font-bold hover:underline block"
                  >
                    https://wa.me/918806180088
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Card variant="filled" className="p-6 bg-slate-900 text-white rounded-[24px] space-y-3">
            <h4 className="font-display font-bold text-base text-white">
              Instant Booking via WhatsApp
            </h4>
            <p className="text-xs text-slate-300">
              Need a Tata Ace, Pickup, 17/19 Ft Truck, or Construction Vehicle immediately in Goa? Send us a message on WhatsApp.
            </p>
            <a
              href="https://wa.me/918806180088?text=Hello%20BhadeKaar!%20I%20need%20a%20goods%20transport%20vehicle%20in%20Goa."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 font-display font-bold text-xs text-white transition-colors"
            >
              <MessageCircle size={16} /> Open WhatsApp Chat
            </a>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Card variant="outlined" className="p-6 md:p-8 relative h-full flex flex-col justify-center">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 flex items-center justify-center rounded-full mx-auto shadow-sm">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  Thank you for contacting BhadeKaar. Our team in Goa will respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    error={errors.phone}
                    required
                  />
                  <div className="relative">
                    <label className="absolute left-4 -top-2.5 scale-85 bg-white dark:bg-slate-950 px-1.5 text-xs text-slate-500 dark:text-slate-400 font-sans">
                      Subject Matter
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-2xl border border-slate-300 bg-transparent px-4 py-3.5 font-sans text-sm text-slate-900 outline-none dark:border-slate-700 dark:text-slate-100"
                    >
                      <option value="general">General Transport Inquiry</option>
                      <option value="goods">Commercial Goods Booking</option>
                      <option value="driver">Goods Driver Partner Registration</option>
                      <option value="construction">Construction Material Transport</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your goods transport requirement in Goa..."
                    className={`w-full rounded-2xl border bg-transparent p-4 font-sans text-sm text-slate-900 outline-none dark:text-slate-100 placeholder-slate-400
                      ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-primary dark:border-slate-700 dark:focus:border-cyan-400'}
                    `}
                  />
                  {errors.message && (
                    <span className="mt-1 text-xs text-red-500 font-sans block pl-2">
                      {errors.message}
                    </span>
                  )}
                </div>

                <Button type="submit" variant="filled" color="primary" fullWidth className="h-11">
                  Send Message <Send size={14} className="ml-1.5" />
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
};
