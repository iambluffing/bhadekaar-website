import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Truck, ToggleLeft, ToggleRight, FileText, CheckCircle2, XCircle, Clock, Building, Users } from 'lucide-react';

export const Admin: React.FC = () => {
  const {
    vehicles,
    services,
    vendors,
    driverApplications,
    toggleVehicle,
    toggleService,
    toggleVendor,
    updateDriverStatus,
  } = useData();

  const [activeTab, setActiveTab] = useState<'vehicles' | 'services' | 'vendors' | 'drivers'>('vehicles');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 text-white p-6 rounded-[24px]">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/20 text-cyan-400 rounded-2xl">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="font-display font-black text-2xl text-white">
              BhadeKaar Control Panel
            </h1>
            <p className="text-xs text-slate-400">
              Manage live vehicle availability, service toggles, vendors, and driver document verifications in Goa.
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold bg-slate-800 text-cyan-400 px-3 py-1.5 rounded-full border border-slate-700">
          Admin Portal Mode
        </span>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('vehicles')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all
            ${activeTab === 'vehicles' ? 'bg-primary text-white dark:bg-cyan-400 dark:text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400'}
          `}
        >
          <Truck size={16} /> Vehicle Toggles ({vehicles.filter(v => v.active).length}/{vehicles.length})
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all
            ${activeTab === 'services' ? 'bg-primary text-white dark:bg-cyan-400 dark:text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400'}
          `}
        >
          <Building size={16} /> Service Toggles ({services.filter(s => s.active).length}/{services.length})
        </button>

        <button
          onClick={() => setActiveTab('vendors')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all
            ${activeTab === 'vendors' ? 'bg-primary text-white dark:bg-cyan-400 dark:text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400'}
          `}
        >
          <Users size={16} /> Vendor Toggles ({vendors.filter(v => v.active).length}/{vendors.length})
        </button>

        <button
          onClick={() => setActiveTab('drivers')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all
            ${activeTab === 'drivers' ? 'bg-primary text-white dark:bg-cyan-400 dark:text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400'}
          `}
        >
          <FileText size={16} /> Driver Applications ({driverApplications.length})
        </button>
      </div>

      {/* Tab 1: Vehicle Toggles */}
      {activeTab === 'vehicles' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Toggle Goods Vehicles Availability
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Changes update immediately across Home, Services, and Pricing Calculator pages.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vehicles.map((v) => (
              <Card
                key={v.id}
                variant="outlined"
                className={`p-5 flex items-center justify-between border-2 transition-all
                  ${v.active ? 'border-emerald-500/40 bg-emerald-500/[0.02]' : 'border-red-400/40 bg-red-500/[0.02] opacity-75'}
                `}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-base text-slate-900 dark:text-white">
                      {v.name}
                    </span>
                    <span className={`text-xxs font-bold px-2 py-0.5 rounded-full uppercase
                      ${v.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 text-red-500'}
                    `}>
                      {v.active ? 'Enabled / Active' : 'Disabled / Hidden'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Category: {v.category} | Capacity: {v.weightCapacity}
                  </p>
                </div>

                <button
                  onClick={() => toggleVehicle(v.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-display font-bold text-xs transition-colors
                    ${v.active ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/40 dark:text-red-400' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400'}
                  `}
                >
                  {v.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                  <span>{v.active ? 'Disable' : 'Enable'}</span>
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Service Toggles */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            Toggle Service Offerings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s) => (
              <Card
                key={s.id}
                variant="outlined"
                className={`p-6 space-y-4 border-2 transition-all
                  ${s.active ? 'border-emerald-500/40' : 'border-red-400/40 opacity-75'}
                `}
              >
                <div className="space-y-2">
                  <span className={`text-xxs font-bold px-2.5 py-0.5 rounded-full uppercase
                    ${s.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 text-red-500'}
                  `}>
                    {s.active ? 'Service Active' : 'Service Suspended'}
                  </span>
                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    {s.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{s.sub}</p>
                </div>

                <Button
                  variant={s.active ? 'outlined' : 'filled'}
                  color={s.active ? 'error' : 'secondary'}
                  fullWidth
                  onClick={() => toggleService(s.id)}
                  className="h-9 text-xs"
                >
                  {s.active ? 'Disable Service' : 'Enable Service'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Vendor Toggles */}
      {activeTab === 'vendors' && (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            Toggle Partner Vendors & Fleets in Goa
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vendors.map((v) => (
              <Card
                key={v.id}
                variant="outlined"
                className={`p-6 space-y-3 border-2 transition-all
                  ${v.active ? 'border-emerald-500/40' : 'border-red-400/40 opacity-75'}
                `}
              >
                <div className="space-y-1">
                  <span className={`text-xxs font-bold px-2 py-0.5 rounded-full uppercase
                    ${v.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 text-red-500'}
                  `}>
                    {v.active ? 'Vendor Active' : 'Vendor Inactive'}
                  </span>
                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    {v.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{v.vehicleType}</p>
                  <p className="text-xxs text-slate-400">{v.location} | Phone: {v.phone}</p>
                </div>

                <Button
                  variant={v.active ? 'outlined' : 'filled'}
                  color={v.active ? 'error' : 'primary'}
                  fullWidth
                  onClick={() => toggleVendor(v.id)}
                  className="h-9 text-xs"
                >
                  {v.active ? 'Disable Vendor' : 'Enable Vendor'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Driver Applications & Document Manager */}
      {activeTab === 'drivers' && (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            Submitted Driver Applications & Verification Documents
          </h3>

          {driverApplications.length === 0 ? (
            <Card variant="outlined" className="p-12 text-center text-slate-400 text-xs border-dashed">
              No driver applications submitted yet. Once a driver completes the Driver Partner form, their License, RC, PUC, and Aadhaar documents will appear here for audit.
            </Card>
          ) : (
            <div className="space-y-4">
              {driverApplications.map((app) => (
                <Card key={app.id} variant="outlined" className="p-6 space-y-4 border-slate-200 dark:border-slate-800">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-extrabold text-base text-slate-900 dark:text-white">
                          {app.name}
                        </span>
                        <span className="text-xs font-mono font-bold text-primary dark:text-cyan-400 bg-primary/10 dark:bg-cyan-500/10 px-2 py-0.5 rounded-full">
                          {app.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Phone: {app.phone} | Location: {app.city} | Submitted: {app.submittedAt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize flex items-center gap-1
                        ${app.status === 'approved' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : app.status === 'rejected' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-600'}
                      `}>
                        {app.status === 'approved' && <CheckCircle2 size={14} />}
                        {app.status === 'rejected' && <XCircle size={14} />}
                        {app.status === 'pending' && <Clock size={14} />}
                        {app.status}
                      </span>
                    </div>
                  </div>

                  {/* Vehicle & Bank details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 dark:text-slate-300">
                    <div>
                      <span className="font-bold block text-slate-400">Goods Vehicle Type & Number</span>
                      <span>{app.vehicleType.toUpperCase()} — {app.vehicleNumber.toUpperCase()}</span>
                    </div>
                    <div>
                      <span className="font-bold block text-slate-400">Bank Payout Info</span>
                      <span>{app.bankAccount}</span>
                    </div>
                  </div>

                  {/* Submitted Documents (DL, RC, PUC, Aadhaar) */}
                  <div className="space-y-2 pt-2">
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">
                      Uploaded Documents Audit (4 Documents):
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">1. Driving License</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                          <FileText size={12} /> {app.documents.license?.name || 'Verified DL'}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">2. Vehicle RC</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                          <FileText size={12} /> {app.documents.rc?.name || 'Verified RC'}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">3. PUC Certificate</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                          <FileText size={12} /> {app.documents.puc?.name || 'Verified PUC'}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">4. Aadhaar Card</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                          <FileText size={12} /> {app.documents.aadhaar?.name || 'Verified Aadhaar'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-850">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => updateDriverStatus(app.id, 'rejected')}
                      className="h-8 text-xs"
                    >
                      Reject Application
                    </Button>
                    <Button
                      variant="filled"
                      color="secondary"
                      onClick={() => updateDriverStatus(app.id, 'approved')}
                      className="h-8 text-xs bg-emerald-600 hover:bg-emerald-500 text-white"
                    >
                      Approve Driver
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
