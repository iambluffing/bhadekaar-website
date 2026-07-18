import React from 'react';
import { Shield, Sparkles, Target, Compass, Truck, MapPin } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const About: React.FC = () => {
  const values = [
    {
      icon: <Shield className="text-primary dark:text-cyan-400" size={24} />,
      title: 'Reliable Goods Transport',
      description: 'Ensuring safe, prompt, and dependable commercial vehicle freight for businesses and individuals in Goa.',
    },
    {
      icon: <Sparkles className="text-secondary" size={24} />,
      title: 'Transparent Freight Rates',
      description: 'Clear, direct pricing for Tata Ace, Pickups, Tempos, and Heavy Trucks without hidden fees or unverified surcharges.',
    },
    {
      icon: <Compass className="text-primary dark:text-cyan-400" size={24} />,
      title: 'Goa Statewide Logistics',
      description: 'Dedicated to connecting local commerce, construction sites, and households with verified commercial goods vehicles.',
    },
  ];

  return (
    <div className="w-full space-y-16 pb-20 text-left">
      {/* 1. Header & Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 md:py-20 diagonal-bg text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-cyan-500/10 dark:text-cyan-400">
            <Target size={12} /> Commercial Logistics in Goa
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-slate-900 dark:text-white tracking-tight">
            About <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">BhadeKaar</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            BhadeKaar is a commercial goods transport provider based in Goa, India. We focus exclusively on commercial freight, offering vehicles ranging from Tata Ace and Pickups to 17/19 Feet Trucks and Construction Material Vehicles.
          </p>
        </div>
      </section>

      {/* 2. Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Our Business Principles
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Providing honest, direct, and efficient commercial transport solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <Card key={i} variant="outlined" className="p-8 space-y-4 hover:border-cyan-500/20 transition-colors">
              <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl w-fit">
                {v.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                {v.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {v.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Honest Team / Company Info (No Fake Profiles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card variant="outlined" className="p-8 text-center space-y-4 bg-slate-50/50 dark:bg-slate-900/40 border-dashed max-w-3xl mx-auto">
          <div className="p-3 bg-primary/10 text-primary dark:bg-cyan-500/10 dark:text-cyan-400 rounded-full w-fit mx-auto">
            <Truck size={24} />
          </div>
          <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
            BhadeKaar Team & Operations
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
            Headquartered in <strong>Goa, India</strong>, BhadeKaar operates with a dedicated team managing commercial goods dispatch, driver partner onboarding, and customer support. Verified leadership profiles will be published as our digital portal expands.
          </p>
          <div className="pt-2 flex justify-center items-center gap-2 text-xs font-semibold text-primary dark:text-cyan-400">
            <MapPin size={14} /> Goa, India | Phone: +91 8806180088 | Email: info@bhadekaar.com
          </div>
        </Card>
      </section>
    </div>
  );
};
