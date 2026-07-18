import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Info, Calculator, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useData, type VehicleItem } from '../../context/DataContext';

export const PricingCalculator: React.FC = () => {
  const { vehicles } = useData();

  // Filter only active vehicles enabled by admin
  const activeVehicles = vehicles.filter((v) => v.active);

  const [selectedVehicle, setSelectedVehicle] = useState<VehicleItem | undefined>(activeVehicles[0]);
  const [pickup, setPickup] = useState('Panaji, Goa');
  const [drop, setDrop] = useState('Margao, Goa');
  const [distance, setDistance] = useState(33);
  const [needHelper, setNeedHelper] = useState(true);
  const [calculatedFares, setCalculatedFares] = useState({
    base: 0,
    distanceCharge: 0,
    helperCharge: 0,
    tax: 0,
    total: 0,
  });
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    if (activeVehicles.length > 0 && !selectedVehicle) {
      setSelectedVehicle(activeVehicles[0]);
    }
  }, [activeVehicles, selectedVehicle]);

  useEffect(() => {
    if (!selectedVehicle) return;
    const base = selectedVehicle.baseFare;
    const distanceCharge = distance * selectedVehicle.ratePerKm;
    const helperCharge = needHelper ? 250 : 0;
    const tax = Math.round((base + distanceCharge + helperCharge) * 0.18);
    const total = base + distanceCharge + helperCharge + tax;

    setCalculatedFares({
      base,
      distanceCharge,
      helperCharge,
      tax,
      total,
    });
  }, [selectedVehicle, distance, needHelper]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedVehicle) {
      setShowInvoice(true);
    }
  };

  const handleWhatsAppBooking = () => {
    if (!selectedVehicle) return;
    const text = encodeURIComponent(
      `Hello BhadeKaar! I would like to book a ${selectedVehicle.name} for goods transport in Goa.\n\n` +
      `• Pickup: ${pickup}\n` +
      `• Drop: ${drop}\n` +
      `• Distance: ~${distance} km\n` +
      `• Est. Total: ₹${calculatedFares.total}\n\n` +
      `Please confirm availability.`
    );
    window.open(`https://wa.me/918806180088?text=${text}`, '_blank');
  };

  if (activeVehicles.length === 0) {
    return (
      <Card variant="outlined" className="p-8 text-center text-slate-400 text-xs border-dashed">
        Vehicles are currently offline. Please contact BhadeKaar support via WhatsApp at 8806180088.
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
      {/* Form Container */}
      <div className="lg:col-span-7 space-y-6">
        <Card variant="outlined" className="p-6 md:p-8 space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-cyan-500/10 dark:text-cyan-400 mb-2">
              <Calculator size={12} />
              Commercial Freight Estimator
            </span>
            <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
              Freight Cost Estimator
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Calculate estimated fares for commercial goods transport within Goa.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Pickup Point (Goa)"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required
                placeholder="e.g. Panaji, Mapusa"
              />
              <Input
                label="Destination Point (Goa)"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                required
                placeholder="e.g. Margao, Vasco"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-700 dark:text-slate-300">Estimated Distance:</span>
                <span className="font-display font-bold text-primary dark:text-cyan-400">{distance} km</span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary dark:accent-cyan-400"
              />
              <div className="flex justify-between text-xxs text-slate-400 px-1">
                <span>5 km</span>
                <span>75 km</span>
                <span>150 km</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Select Active Goods Vehicle:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {activeVehicles.map((v) => {
                  const isSelected = selectedVehicle?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVehicle(v)}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-semibold text-left transition-all duration-300
                        ${isSelected
                          ? 'border-primary bg-primary/5 text-primary dark:border-cyan-400 dark:bg-cyan-500/10 dark:text-cyan-400 ring-1 ring-primary dark:ring-cyan-400'
                          : 'border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400'
                        }
                      `}
                    >
                      <div className="font-bold truncate">{v.name}</div>
                      <div className="text-xxs opacity-75 mt-0.5">Base: ₹{v.baseFare}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-850">
              <input
                id="helper"
                type="checkbox"
                checked={needHelper}
                onChange={(e) => setNeedHelper(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary dark:accent-cyan-400 cursor-pointer"
              />
              <label htmlFor="helper" className="text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                <span className="font-bold block">Need Loading / Unloading Helper?</span>
                Add a driver assistant for handling heavy items (+ ₹250)
              </label>
            </div>

            <Button type="submit" variant="filled" color="primary" fullWidth className="h-11">
              Calculate Freight Estimate
            </Button>
          </form>
        </Card>
      </div>

      {/* Invoice Display */}
      <div className="lg:col-span-5">
        {showInvoice && selectedVehicle ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="space-y-4"
          >
            <Card variant="elevated" className="bg-slate-50 dark:bg-slate-900 p-6 md:p-8 relative border-2 border-primary/20 dark:border-cyan-400/20">
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-gradient-to-r from-primary to-secondary text-white text-xxs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Sparkles size={10} /> Freight Estimate
              </div>

              <h4 className="font-display font-bold text-lg text-slate-950 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
                Commercial Goods Invoice
              </h4>

              <div className="space-y-3.5 my-6 text-sm">
                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <span>Transport Route</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 max-w-[180px] text-right truncate">
                    {pickup} ➔ {drop}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300">Goods Vehicle</span>
                  <span className="font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full text-xs">
                    {selectedVehicle.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Base Fare</span>
                  <span className="font-semibold text-slate-900 dark:text-white flex items-center">
                    <IndianRupee size={14} /> {calculatedFares.base}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Distance Freight ({distance} km)</span>
                  <span className="font-semibold text-slate-900 dark:text-white flex items-center">
                    <IndianRupee size={14} /> {calculatedFares.distanceCharge}
                  </span>
                </div>

                {calculatedFares.helperCharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">Loading Helper Fee</span>
                    <span className="font-semibold text-slate-900 dark:text-white flex items-center">
                      <IndianRupee size={14} /> {calculatedFares.helperCharge}
                    </span>
                  </div>
                )}

                <div className="flex justify-between border-t border-dashed border-slate-200 dark:border-slate-800 pt-3">
                  <span className="text-slate-600 dark:text-slate-300">GST / Commercial Tax (18%)</span>
                  <span className="font-semibold text-slate-900 dark:text-white flex items-center">
                    <IndianRupee size={14} /> {calculatedFares.tax}
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl flex justify-between items-center border border-slate-200 dark:border-slate-800 mb-6">
                <div>
                  <span className="block text-xxs font-bold text-slate-400 uppercase tracking-wider">Estimated Total</span>
                  <span className="text-xxs text-emerald-500 flex items-center gap-1 font-semibold mt-0.5">
                    <CheckCircle2 size={10} /> Tolls extra if applicable
                  </span>
                </div>
                <span className="font-display font-extrabold text-3xl text-slate-900 dark:text-white flex items-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  <IndianRupee size={26} className="text-primary dark:text-cyan-400 mr-0.5" />
                  {calculatedFares.total}
                </span>
              </div>

              <div className="flex gap-2">
                <Button variant="outlined" color="primary" fullWidth onClick={() => setShowInvoice(false)}>
                  Modify
                </Button>
                <Button variant="filled" color="secondary" fullWidth onClick={handleWhatsAppBooking}>
                  Book on WhatsApp
                </Button>
              </div>

              <div className="mt-4 flex gap-1.5 items-start bg-slate-100/50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-200/50 dark:border-slate-850/50">
                <Info size={14} className="text-primary dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                  Fares are estimated based on standard Goa route distances. For special heavy cargo or bulk orders, feel free to contact us on WhatsApp directly.
                </p>
              </div>
            </Card>
          </motion.div>
        ) : (
          <div className="h-full min-h-[300px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[24px] flex flex-col justify-center items-center p-6 text-center text-slate-400 dark:text-slate-500">
            <Calculator size={48} className="mb-4 text-slate-300 dark:text-slate-700 animate-pulse-subtle" />
            <h5 className="font-display font-bold text-base text-slate-700 dark:text-slate-300 mb-1">
              Freight Invoice Awaiting
            </h5>
            <p className="text-xs max-w-[240px]">
              Specify pickup and drop locations in Goa to generate a transparent freight estimate.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
