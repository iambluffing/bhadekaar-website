import React from 'react';
import { Truck, HardHat, PackageCheck, Sparkles, MessageCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { PricingCalculator } from '../components/shared/PricingCalculator';

export const Services: React.FC = () => {
  const serviceCategories = [
    {
      icon: <Truck size={24} className="text-primary dark:text-cyan-400" />,
      title: 'Light & Medium Goods Transport',
      sub: 'Tata Ace, Pickup, Mini Truck, Tempo',
      details: [
        'Intra-city goods transport across Goa',
        'Retail inventory & store deliveries',
        'Residential furniture & house shifting',
        'Optional loading helper assistance'
      ],
      badge: 'Local Freight'
    },
    {
      icon: <PackageCheck size={24} className="text-secondary" />,
      title: 'Heavy Commercial Logistics',
      sub: '17 Feet & 19 Feet Trucks',
      details: [
        'Bulk commercial freight movement',
        'Industrial goods & factory supplies',
        'High capacity containerized transport',
        'Inter-city and intra-city Goa routes'
      ],
      badge: 'Heavy Freight'
    },
    {
      icon: <HardHat size={24} className="text-amber-500" />,
      title: 'Construction Material Transport',
      sub: 'Dumpers, Tippers & Site Trucks',
      details: [
        'River sand & Manufactured sand (M-Sand)',
        'Red bricks, fly-ash blocks & stones',
        'Crushed stone aggregate & gravel',
        'Bulk cement bags & site materials'
      ],
      badge: 'Construction Logistics'
    }
  ];

  return (
    <div className="w-full space-y-20 pb-20 text-left">
      {/* 1. Header Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 md:py-20 diagonal-bg text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-cyan-500/10 dark:text-cyan-400">
            <Sparkles size={12} /> Commercial Freight Solutions
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-slate-900 dark:text-white tracking-tight">
            Commercial Goods Transport in Goa
          </h1>
          <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            BhadeKaar connects you with verified goods transport vehicles in Goa. Whether you need a Tata Ace for local items or a 19ft truck for heavy industrial loads, we have you covered.
          </p>
        </div>
      </section>

      {/* 2. Interactive Calculator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Calculate Freight Estimates
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Select goods vehicle type and specify Goa pickup/drop locations to estimate transport costs.
          </p>
        </div>
        <PricingCalculator />
      </section>

      {/* 3. Service Breakdown Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Services Overview
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Dedicated commercial transport solutions for Goa's businesses, contractors, and residents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCategories.map((service, idx) => (
            <Card key={idx} variant="outlined" className="p-8 flex flex-col justify-between hover:border-primary/20 transition-all duration-300">
              <div className="space-y-6 text-left">
                <div className="flex justify-between items-center">
                  <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl w-fit">
                    {service.icon}
                  </div>
                  <span className="text-xxs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {service.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-black text-xl text-slate-900 dark:text-white">
                    {service.title}
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold block mt-0.5">
                    {service.sub}
                  </span>
                </div>

                <ul className="space-y-3">
                  {service.details.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-850 pt-6 mt-6">
                <a
                  href="https://wa.me/918806180088?text=Hello%20BhadeKaar!%20I%20am%20interested%20in%20booking%20goods%20transport."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center justify-center gap-1.5"
                >
                  <MessageCircle size={14} /> Book via WhatsApp ➔
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
