import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Truck, ShieldCheck, FileText, CheckCircle2, ChevronRight, ChevronLeft, Upload, Sparkles, MapPin } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useData } from '../context/DataContext';

export const RegisterDriver: React.FC = () => {
  const { addDriverApplication } = useData();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Goa',
    bankAccount: '',
    vehicleNumber: '',
    vehicleType: 'tata-ace',
    licenseUploaded: false,
    licenseName: '',
    rcUploaded: false,
    rcName: '',
    pucUploaded: false,
    pucName: '',
    aadhaarUploaded: false,
    aadhaarName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    const tempErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name) tempErrors.name = 'Full Name is required';
      if (!formData.phone) {
        tempErrors.phone = 'Phone number is required';
      } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
        tempErrors.phone = 'Provide a valid 10-digit mobile number';
      }
      if (!formData.bankAccount) {
        tempErrors.bankAccount = 'Bank Account / IFSC details required';
      }
    } else if (step === 2) {
      if (!formData.vehicleNumber) {
        tempErrors.vehicleNumber = 'Vehicle Registration Number is required';
      } else if (!/^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/.test(formData.vehicleNumber.replace(/\s+/g, '').toUpperCase())) {
        tempErrors.vehicleNumber = 'Provide valid state registration (e.g. GA03A1234)';
      }
    } else if (step === 3) {
      if (!formData.licenseUploaded) tempErrors.license = 'Driving License upload required';
      if (!formData.rcUploaded) tempErrors.rc = 'Vehicle RC copy upload required';
      if (!formData.pucUploaded) tempErrors.puc = 'Vehicle PUC certificate upload required';
      if (!formData.aadhaarUploaded) tempErrors.aadhaar = 'Aadhaar Card copy upload required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      // Save application to DataContext
      addDriverApplication({
        name: formData.name,
        phone: formData.phone,
        city: 'Goa, India',
        bankAccount: formData.bankAccount,
        vehicleType: formData.vehicleType,
        vehicleNumber: formData.vehicleNumber,
        documents: {
          license: { name: formData.licenseName || 'driving_license_scan.jpg', url: '#', uploadedAt: new Date().toISOString() },
          rc: { name: formData.rcName || 'vehicle_rc_copy.pdf', url: '#', uploadedAt: new Date().toISOString() },
          puc: { name: formData.pucName || 'puc_certificate.pdf', url: '#', uploadedAt: new Date().toISOString() },
          aadhaar: { name: formData.aadhaarName || 'aadhaar_card.png', url: '#', uploadedAt: new Date().toISOString() },
        },
      });
      setStep(4);
    }
  };

  const stepsConfig = [
    { title: 'Personal Info', icon: <User size={16} /> },
    { title: 'Goods Vehicle', icon: <Truck size={16} /> },
    { title: 'Upload KYC', icon: <FileText size={16} /> },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-left">
      {/* 1. Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary">
          <Sparkles size={12} /> Goods Vehicle Partners in Goa
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
          Attach Your Commercial Vehicle
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Register your Tata Ace, Pickup, Mini Truck, Tempo, 17/19ft Truck, or Construction Vehicle with BhadeKaar in Goa.
        </p>
      </div>

      {/* 2. Step Progress Indicators */}
      {step < 4 && (
        <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-900 rounded-2xl p-4 max-w-xl mx-auto border border-slate-200/50 dark:border-slate-800/50">
          {stepsConfig.map((s, index) => {
            const stepNum = index + 1;
            const isCompleted = step > stepNum;
            const isActive = step === stepNum;
            return (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                  ${isCompleted ? 'bg-emerald-500 text-white' : isActive ? 'bg-primary text-white dark:bg-cyan-400 dark:text-slate-950 shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}
                `}>
                  {isCompleted ? <CheckCircle2 size={16} /> : s.icon}
                </div>
                <span className={`text-xs font-semibold hidden md:inline
                  ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400'}
                `}>
                  {s.title}
                </span>
                {index < 2 && <ChevronRight size={14} className="text-slate-300 hidden md:inline ml-2" />}
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Wizard Content Card */}
      <Card variant="elevated" className="max-w-xl mx-auto p-6 md:p-8 border-2 border-slate-150 dark:border-slate-850 shadow-xl bg-white dark:bg-slate-950">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Personal & Bank Payout Details
              </h3>

              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
                required
              />

              <Input
                label="Mobile Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={errors.phone}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Location"
                  value="Goa, India"
                  disabled
                  helperText="Service operating in Goa"
                />

                <Input
                  label="Bank Account / IFSC Code"
                  value={formData.bankAccount}
                  onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                  error={errors.bankAccount}
                  helperText="For direct freight payouts"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button variant="filled" color="primary" onClick={handleNext} className="h-10">
                  Next Step <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Commercial Goods Vehicle Details
              </h3>

              <div className="relative">
                <label className="absolute left-4 -top-2.5 bg-white dark:bg-slate-950 px-1.5 text-xs text-slate-500 dark:text-slate-400 font-sans">
                  Supported Vehicle Category
                </label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-transparent px-4 py-3.5 font-sans text-sm text-slate-900 outline-none dark:border-slate-700 dark:text-slate-100"
                >
                  <option value="tata-ace">Tata Ace</option>
                  <option value="pickup">Pickup</option>
                  <option value="mini-truck">Mini Truck</option>
                  <option value="tempo">Tempo</option>
                  <option value="17-feet-truck">17 Feet Truck</option>
                  <option value="19-feet-truck">19 Feet Truck</option>
                  <option value="construction-material-vehicle">Construction Material Vehicle</option>
                </select>
              </div>

              <Input
                label="Commercial Registration Number (e.g. GA03A1234)"
                value={formData.vehicleNumber}
                onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                error={errors.vehicleNumber}
                placeholder="GA03A1234"
                required
              />

              <div className="pt-4 flex justify-between">
                <Button variant="outlined" color="primary" onClick={handleBack} className="h-10">
                  <ChevronLeft size={16} className="mr-1" /> Back
                </Button>
                <Button variant="filled" color="primary" onClick={handleNext} className="h-10">
                  Next Step <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  Upload Scanned KYC Documents (4 Files)
                </h3>
                <p className="text-xxs text-slate-400 mt-0.5">
                  Supported formats: PDF, JPEG, PNG. Max 5MB file sizes.
                </p>
              </div>

              <div className="space-y-4">
                {/* DL upload box */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">1. Commercial Driving License (DL)</span>
                  <div
                    onClick={() => setFormData({ ...formData, licenseUploaded: true, licenseName: 'driving_license_scan.jpg' })}
                    className={`border-2 border-dashed rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-colors
                      ${formData.licenseUploaded ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-300 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${formData.licenseUploaded ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                        <Upload size={16} />
                      </div>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        {formData.licenseUploaded ? 'driving_license_scan.jpg uploaded!' : 'Click to attach Driving License (DL)'}
                      </span>
                    </div>
                    {formData.licenseUploaded && <span className="text-[10px] text-emerald-600 font-bold uppercase">Success</span>}
                  </div>
                  {errors.license && <span className="text-xxs text-red-500 pl-1">{errors.license}</span>}
                </div>

                {/* RC upload box */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">2. Commercial Vehicle RC Copy</span>
                  <div
                    onClick={() => setFormData({ ...formData, rcUploaded: true, rcName: 'vehicle_rc_copy.pdf' })}
                    className={`border-2 border-dashed rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-colors
                      ${formData.rcUploaded ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-300 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${formData.rcUploaded ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                        <Upload size={16} />
                      </div>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        {formData.rcUploaded ? 'vehicle_rc_copy.pdf uploaded!' : 'Click to attach Vehicle RC Copy'}
                      </span>
                    </div>
                    {formData.rcUploaded && <span className="text-[10px] text-emerald-600 font-bold uppercase">Success</span>}
                  </div>
                  {errors.rc && <span className="text-xxs text-red-500 pl-1">{errors.rc}</span>}
                </div>

                {/* PUC upload box */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">3. PUC Certificate (Pollution Certificate)</span>
                  <div
                    onClick={() => setFormData({ ...formData, pucUploaded: true, pucName: 'puc_certificate.pdf' })}
                    className={`border-2 border-dashed rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-colors
                      ${formData.pucUploaded ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-300 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${formData.pucUploaded ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                        <Upload size={16} />
                      </div>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        {formData.pucUploaded ? 'puc_certificate.pdf uploaded!' : 'Click to attach PUC Certificate'}
                      </span>
                    </div>
                    {formData.pucUploaded && <span className="text-[10px] text-emerald-600 font-bold uppercase">Success</span>}
                  </div>
                  {errors.puc && <span className="text-xxs text-red-500 pl-1">{errors.puc}</span>}
                </div>

                {/* Aadhaar upload box */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">4. Driver Aadhaar Card</span>
                  <div
                    onClick={() => setFormData({ ...formData, aadhaarUploaded: true, aadhaarName: 'aadhaar_card.png' })}
                    className={`border-2 border-dashed rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-colors
                      ${formData.aadhaarUploaded ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-300 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${formData.aadhaarUploaded ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                        <Upload size={16} />
                      </div>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        {formData.aadhaarUploaded ? 'aadhaar_card.png uploaded!' : 'Click to attach Aadhaar card'}
                      </span>
                    </div>
                    {formData.aadhaarUploaded && <span className="text-[10px] text-emerald-600 font-bold uppercase">Success</span>}
                  </div>
                  {errors.aadhaar && <span className="text-xxs text-red-500 pl-1">{errors.aadhaar}</span>}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outlined" color="primary" onClick={handleBack} className="h-10">
                  <ChevronLeft size={16} className="mr-1" /> Back
                </Button>
                <Button variant="filled" color="primary" onClick={handleSubmit} className="h-10">
                  Submit Application <ShieldCheck size={16} className="ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 space-y-5"
            >
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={36} />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
                  Application Submitted
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>! Your application for <strong>{formData.vehicleNumber.toUpperCase()}</strong> in Goa has been sent to our admin verification queue.
                </p>
              </div>

              <div className="h-px bg-slate-100 dark:bg-slate-900 my-4" />

              <div className="flex flex-col gap-2 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl text-xxs max-w-sm mx-auto text-left border border-slate-100 dark:border-slate-850">
                <div className="flex gap-2">
                  <MapPin size={16} className="text-primary dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-800 dark:text-slate-200">BhadeKaar Goa Operations</span>
                    Phone: 8806180088 | Email: info@bhadekaar.com
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
};
