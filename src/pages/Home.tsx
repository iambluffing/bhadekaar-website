import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, ArrowRight, ShieldCheck, Map, Sparkles, HardHat, MessageCircle, PackageCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { VehicleSelector } from '../components/shared/VehicleSelector';

export const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  } as const;

  return (
    <div className="w-full space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-28 diagonal-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Hero Left */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-cyan-500/10 dark:text-cyan-400">
                <Sparkles size={12} /> Commercial Goods Transport in Goa, India
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="font-display font-black text-4xl sm:text-6xl tracking-tight text-slate-900 dark:text-white leading-[1.05]"
              >
                Hire Commercial Goods Vehicles{' '}
                <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                  In Goa.
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed"
              >
                BhadeKaar provides reliable commercial goods transport across Goa. From Tata Ace and Pickups to 17/19 Feet Trucks and Construction Material Vehicles, hire verified freight vehicles instantly.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://wa.me/918806180088?text=Hello%20BhadeKaar!%20I%20would%20like%20to%20book%20a%20commercial%20goods%20vehicle%20in%20Goa."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="filled" color="secondary" className="h-12 px-8 flex items-center gap-2 group bg-emerald-600 hover:bg-emerald-500 text-white">
                    <MessageCircle size={18} />
                    Book on WhatsApp
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <Link to="/services">
                  <Button variant="elevated" color="primary" className="h-12 px-8">
                    View Goods Vehicles
                  </Button>
                </Link>
              </motion.div>

              {/* Verified Features list */}
              <motion.div variants={itemVariants} className="pt-6 border-t border-slate-200/50 dark:border-slate-800/40 grid grid-cols-3 gap-4 max-w-md">
                <div>
                  <span className="block font-display font-bold text-sm text-slate-900 dark:text-white">Goa State</span>
                  <span className="text-xxs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Service Coverage</span>
                </div>
                <div>
                  <span className="block font-display font-bold text-sm text-slate-900 dark:text-white">7 Fleet Types</span>
                  <span className="text-xxs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Goods Vehicles</span>
                </div>
                <div>
                  <span className="block font-display font-bold text-sm text-slate-900 dark:text-white">Direct WhatsApp</span>
                  <span className="text-xxs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Instant Booking</span>
                </div>
              </motion.div>
            </div>

            {/* Hero Right - Card Graphic */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full relative"
              >
                <Card variant="elevated" className="overflow-hidden border-2 border-primary/10 dark:border-cyan-500/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md p-6 space-y-5 text-left">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-850">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-primary/10 text-primary dark:bg-cyan-500/10 dark:text-cyan-400 rounded-xl">
                        <Truck size={20} />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                          BhadeKaar Logistics
                        </h4>
                        <span className="text-xxs text-slate-400">Goa Commercial Freight</span>
                      </div>
                    </div>
                    <span className="text-xxs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                      Commercial Goods Only
                    </span>
                  </div>

                  {/* Supported Fleet list preview */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Supported Vehicles in Goa:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <PackageCheck size={14} className="text-primary" /> Tata Ace
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <PackageCheck size={14} className="text-primary" /> Pickup (8ft)
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <PackageCheck size={14} className="text-primary" /> Mini Truck
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <PackageCheck size={14} className="text-primary" /> Tempo
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <PackageCheck size={14} className="text-primary" /> 17 Feet Truck
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <PackageCheck size={14} className="text-primary" /> 19 Feet Truck
                      </div>
                      <div className="p-2 col-span-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <HardHat size={14} className="text-secondary" /> Construction Material Vehicles
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/918806180088"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="filled" color="secondary" fullWidth className="h-10 bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2">
                      <MessageCircle size={16} /> Contact via WhatsApp (8806180088)
                    </Button>
                  </a>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Interactive Vehicle Fleet Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary tracking-widest uppercase">
            Commercial Fleet
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
            Our Goods Transport Vehicles
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Dedicated commercial vehicles available across Goa for cargo transport, factory supplies, construction materials, and shifting.
          </p>
        </div>
        <VehicleSelector />
      </section>

      {/* 3. Core Business Principles */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-20 border-y border-slate-100 dark:border-slate-850/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <Card variant="outlined" className="p-8 space-y-4 hover:border-primary/30 transition-all duration-300">
              <div className="p-3 bg-primary/10 text-primary dark:bg-cyan-500/10 dark:text-cyan-400 rounded-2xl w-fit">
                <Truck size={24} />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Goods Transport Dedicated
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                BhadeKaar exclusively operates commercial goods vehicles. We ensure your materials, goods, and site supplies are handled with care and efficiency.
              </p>
            </Card>

            <Card variant="outlined" className="p-8 space-y-4 hover:border-primary/30 transition-all duration-300">
              <div className="p-3 bg-cyan-500/10 text-cyan-500 dark:bg-cyan-500/20 dark:text-cyan-400 rounded-2xl w-fit">
                <Map size={24} />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Serving All Of Goa
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Based in Goa, India, we provide reliable local transport for towns, industrial estates, commercial markets, and construction projects statewide.
              </p>
            </Card>

            <Card variant="outlined" className="p-8 space-y-4 hover:border-primary/30 transition-all duration-300">
              <div className="p-3 bg-secondary/10 text-secondary rounded-2xl w-fit">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Direct & Transparent Fares
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Get transparent freight estimates directly on the site or via WhatsApp without hidden costs or unverified surcharges.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. Dual Call To Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Driver Partner Card */}
          <div className="rounded-[32px] overflow-hidden p-8 md:p-12 bg-slate-900 text-white flex flex-col justify-between min-h-[340px] text-left relative shadow-lg">
            <div className="space-y-4">
              <span className="text-xxs font-bold uppercase text-secondary tracking-widest bg-secondary/10 px-3 py-1 rounded-full">
                Driver Partner
              </span>
              <h3 className="font-display font-extrabold text-3xl text-white">
                Attach Your Goods Vehicle
              </h3>
              <p className="text-sm text-slate-350 leading-relaxed">
                Own a Tata Ace, Pickup, Tempo, 17ft/19ft Truck, or Construction Vehicle in Goa? Register with BhadeKaar and get consistent freight loads.
              </p>
            </div>
            <div className="pt-6">
              <Link to="/register-driver">
                <Button variant="filled" color="secondary" className="h-11">
                  Register Goods Vehicle
                </Button>
              </Link>
            </div>
          </div>

          {/* Customer Booking Card */}
          <div className="rounded-[32px] overflow-hidden p-8 md:p-12 bg-gradient-to-br from-primary to-indigo-800 text-white flex flex-col justify-between min-h-[340px] text-left relative shadow-lg">
            <div className="space-y-4">
              <span className="text-xxs font-bold uppercase text-cyan-200 tracking-widest bg-white/10 px-3 py-1 rounded-full">
                Hire Goods Vehicles
              </span>
              <h3 className="font-display font-extrabold text-3xl text-white">
                Need Commercial Transport?
              </h3>
              <p className="text-sm text-indigo-100 leading-relaxed">
                Book goods vehicles for residential shifting, commercial stock, store dispatches, or site construction materials in Goa.
              </p>
            </div>
            <div className="pt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/918806180088?text=Hello%20BhadeKaar!%20I%20want%20to%20book%20a%20goods%20vehicle%20in%20Goa."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="filled" color="secondary" className="h-11 bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2">
                  <MessageCircle size={16} /> WhatsApp Booking
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="outlined" className="h-11 border-white/30 text-white hover:bg-white/10">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Client Reviews Placeholder - Honest & No Fake Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card variant="outlined" className="p-8 text-center space-y-3 bg-slate-50/50 dark:bg-slate-900/30 border-dashed">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Client Feedback</span>
          <h3 className="font-display font-extrabold text-xl text-slate-800 dark:text-slate-200">
            Real Customer Reviews — Coming Soon
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            We are dedicated to honest business practices. Verified reviews from our commercial goods clients in Goa will be published here upon verification.
          </p>
        </Card>
      </section>
    </div>
  );
};
