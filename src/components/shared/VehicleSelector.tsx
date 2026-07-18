import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Shield, IndianRupee, Package, HardHat } from 'lucide-react';
import { Card } from '../ui/Card';
import { useData, type VehicleItem } from '../../context/DataContext';

interface VehicleSelectorProps {
  onSelect?: (vehicle: VehicleItem) => void;
  selectedId?: string;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  onSelect,
  selectedId,
}) => {
  const { vehicles } = useData();

  // Only display vehicles that are enabled/active by the Admin
  const activeVehicles = vehicles.filter((v) => v.active);

  const [localSelectedId, setLocalSelectedId] = useState(
    selectedId || (activeVehicles.length > 0 ? activeVehicles[0].id : '')
  );

  const handleSelect = (vehicle: VehicleItem) => {
    setLocalSelectedId(vehicle.id);
    if (onSelect) {
      onSelect(vehicle);
    }
  };

  if (activeVehicles.length === 0) {
    return (
      <Card variant="outlined" className="p-8 text-center text-slate-400 text-xs border-dashed">
        All vehicles are currently undergoing maintenance. Please contact support via WhatsApp (8806180088) for custom transport arrangements.
      </Card>
    );
  }

  return (
    <div className="w-full space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeVehicles.map((vehicle) => {
          const isSelected = localSelectedId === vehicle.id;
          const isConstruction = vehicle.id === 'construction-material-vehicle';
          return (
            <motion.div
              key={vehicle.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                variant={isSelected ? 'elevated' : 'outlined'}
                hoverable
                onClick={() => handleSelect(vehicle)}
                className={`relative flex flex-col h-full justify-between p-6 transition-all duration-300 border-2
                  ${isSelected
                    ? 'border-primary dark:border-cyan-400 bg-primary/[0.02] dark:bg-cyan-500/[0.02]'
                    : 'border-slate-200 dark:border-slate-800'
                  }
                `}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl flex items-center justify-center
                      ${isSelected
                        ? 'bg-primary/10 text-primary dark:bg-cyan-500/20 dark:text-cyan-400'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                      }
                    `}>
                      {isConstruction ? <HardHat size={24} /> : <Truck size={24} />}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {vehicle.category}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-1">
                    {vehicle.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                    {vehicle.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-650 dark:text-slate-300 font-semibold">
                      <Shield size={14} className="text-cyan-500" />
                      <span>Capacity: {vehicle.weightCapacity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <Package size={14} className="text-slate-400" />
                      <span>Best for: {vehicle.suitableFor}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-850 pt-4 flex justify-between items-baseline">
                  <span className="text-xs text-slate-400">Base Fare</span>
                  <span className="font-display font-extrabold text-xl text-slate-900 dark:text-white flex items-center">
                    <IndianRupee size={18} className="stroke-[2.5]" />
                    {vehicle.baseFare}
                    <span className="text-xs font-normal text-slate-500 ml-1">
                      + ₹{vehicle.ratePerKm}/km
                    </span>
                  </span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
