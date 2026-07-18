import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, PhoneCall, MessageCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';

interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'driver' | 'payment';
}

export const FAQ: React.FC = () => {
  const faqs: FaqItem[] = [
    {
      question: 'What types of goods vehicles does BhadeKaar provide in Goa?',
      answer: 'BhadeKaar provides 7 supported commercial goods vehicle categories: Tata Ace, Pickup, Mini Truck, Tempo, 17 Feet Truck, 19 Feet Truck, and Construction Material Vehicles (dumpers & tippers).',
      category: 'general',
    },
    {
      question: 'Does BhadeKaar offer passenger cabs or taxi bookings?',
      answer: 'No. BhadeKaar is strictly a commercial goods transport service. We do not provide cabs, hatchbacks, sedans, SUVs, or passenger rides.',
      category: 'general',
    },
    {
      question: 'How do I book a goods vehicle for transport in Goa?',
      answer: 'You can request a booking directly through our website, or message our official WhatsApp support line at https://wa.me/918806180088 or call 8806180088.',
      category: 'general',
    },
    {
      question: 'How can a goods vehicle owner register as a driver partner?',
      answer: 'Commercial vehicle owners in Goa (owning Tata Ace, Pickup, Tempo, 17ft/19ft trucks, or construction material tippers) can fill out our Driver Partner Registration form with their RC and DL details.',
      category: 'driver',
    },
    {
      question: 'What construction materials can be transported?',
      answer: 'Our construction material vehicles handle river sand, M-sand, gravel, crushed stone, red clay bricks, concrete blocks, cement bags, and site construction debris.',
      category: 'general',
    },
    {
      question: 'What are the official contact details for BhadeKaar?',
      answer: 'Phone: 8806180088 | Email: info@bhadekaar.com | Location: Goa, India. You can also chat directly on WhatsApp at https://wa.me/918806180088.',
      category: 'payment',
    },
  ];

  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'driver' | 'payment'>('all');
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const filteredFaqs = faqs.filter(
    (faq) => activeCategory === 'all' || faq.category === activeCategory
  );

  return (
    <div className="w-full space-y-16 pb-20 text-left">
      {/* 1. Header */}
      <section className="relative overflow-hidden pt-12 pb-16 md:py-20 diagonal-bg text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-cyan-500/10 dark:text-cyan-400">
            <HelpCircle size={12} /> Goods Transport Help Center
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Find clear answers about commercial goods transport, truck categories, and driver partner registrations in Goa.
          </p>
        </div>
      </section>

      {/* 2. Category Selectors & FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {['all', 'general', 'driver', 'payment'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat as any);
                setOpenIndexes([]);
              }}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300
                ${activeCategory === cat
                  ? 'bg-primary text-white dark:bg-cyan-400 dark:text-slate-950 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
                }
              `}
            >
              {cat === 'all' ? 'All Questions' : `${cat} support`}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <Card
                key={index}
                variant="outlined"
                className={`p-0 overflow-hidden transition-all duration-300 border
                  ${isOpen ? 'border-primary/20 dark:border-cyan-400/20' : 'border-slate-250 dark:border-slate-850'}
                `}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-slate-900 dark:text-white font-display font-bold text-sm md:text-base hover:bg-slate-50/50 dark:hover:bg-slate-900/30 text-left focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span className={`p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 transition-transform duration-300
                    ${isOpen ? 'rotate-180 text-primary dark:text-cyan-400' : ''}
                  `}>
                    <ChevronDown size={16} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-900 pt-4 bg-slate-50/30 dark:bg-slate-900/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 3. Contact CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-850 rounded-[24px] p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left space-y-1.5">
            <h4 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
              Have specific goods transport needs in Goa?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Call our team at 8806180088 or chat on WhatsApp.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="tel:8806180088"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-display font-bold text-xs text-primary dark:text-cyan-400 hover:shadow-md transition-shadow"
            >
              <PhoneCall size={14} /> 8806180088
            </a>
            <a
              href="https://wa.me/918806180088"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white font-display font-bold text-xs hover:bg-emerald-500 transition-colors shadow-sm"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
