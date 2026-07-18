import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, ClipboardList, Truck, LogOut, MessageCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Login: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<'otp' | 'password'>('otp');
  const [identifier, setIdentifier] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: Record<string, string> = {};
    if (!identifier) {
      tempErrors.identifier = 'Mobile phone or email is required';
    } else if (!/^[6-9]\d{9}$/.test(identifier) && !/\S+@\S+\.\S+/.test(identifier)) {
      tempErrors.identifier = 'Provide a valid 10-digit mobile number or email';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setErrors({});
    setOtpSent(true);
    alert('BhadeKaar verification: Your login OTP is 4729');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode === '4729') {
      setIsLoggedIn(true);
      setUserName(identifier.includes('@') ? identifier.split('@')[0] : 'Client Account');
    } else {
      setErrors({ otp: 'Invalid OTP code. Try entering "4729"' });
    }
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: Record<string, string> = {};
    if (!identifier) tempErrors.identifier = 'Email / Phone is required';
    if (!password) tempErrors.password = 'Password is required';

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setErrors({});
    setIsLoggedIn(true);
    setUserName(identifier.includes('@') ? identifier.split('@')[0] : 'Client Account');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setOtpSent(false);
    setOtpCode('');
    setIdentifier('');
    setPassword('');
    setErrors({});
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-12 diagonal-bg">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="max-w-md w-full"
          >
            <Card variant="elevated" className="bg-white dark:bg-slate-950 p-8 border-2 border-primary/10 dark:border-cyan-500/10 shadow-xl text-left space-y-6">
              <div className="text-center space-y-2">
                <div className="p-3 bg-primary/10 text-primary dark:bg-cyan-500/10 dark:text-cyan-400 rounded-2xl w-fit mx-auto">
                  <KeyRound size={24} />
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
                  BhadeKaar Portal
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Log in to manage commercial goods transport orders in Goa
                </p>
              </div>

              <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-full">
                <button
                  onClick={() => {
                    setLoginMethod('otp');
                    setErrors({});
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all
                    ${loginMethod === 'otp' ? 'bg-white dark:bg-slate-800 text-primary dark:text-cyan-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}
                  `}
                >
                  OTP Sign In
                </button>
                <button
                  onClick={() => {
                    setLoginMethod('password');
                    setErrors({});
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all
                    ${loginMethod === 'password' ? 'bg-white dark:bg-slate-800 text-primary dark:text-cyan-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}
                  `}
                >
                  Password Sign In
                </button>
              </div>

              {loginMethod === 'otp' ? (
                !otpSent ? (
                  <form onSubmit={handleRequestOtp} className="space-y-4">
                    <Input
                      label="Mobile Number or Email"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      error={errors.identifier}
                      placeholder="e.g. 8806180088 or info@bhadekaar.com"
                      required
                    />
                    <Button type="submit" variant="filled" color="primary" fullWidth className="h-11">
                      Request OTP
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-850 text-xs text-slate-500 dark:text-slate-400">
                      We have sent an OTP to <strong className="text-slate-700 dark:text-slate-300">{identifier}</strong>.<br />
                      Use verification code: <span className="font-mono font-black text-primary dark:text-cyan-400 text-sm">4729</span>
                    </div>

                    <Input
                      label="Enter 4-Digit OTP"
                      type="text"
                      maxLength={4}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      error={errors.otp}
                      placeholder="4729"
                      required
                    />

                    <div className="flex gap-2">
                      <Button variant="outlined" color="primary" onClick={() => setOtpSent(false)} className="flex-1 h-11">
                        Back
                      </Button>
                      <Button type="submit" variant="filled" color="primary" className="flex-2 h-11">
                        Verify OTP
                      </Button>
                    </div>
                  </form>
                )
              ) : (
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  <Input
                    label="Email or Mobile"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    error={errors.identifier}
                    required
                  />
                  <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    required
                  />
                  <Button type="submit" variant="filled" color="primary" fullWidth className="h-11">
                    Log In
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>
        ) : (
          /* Real Customer Portal View without fake data */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl w-full space-y-6 text-left"
          >
            <div className="flex justify-between items-center bg-white dark:bg-slate-950 p-6 rounded-[24px] border border-slate-200 dark:border-slate-850 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center font-display font-black text-xl">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="text-xxs font-bold text-slate-400 uppercase tracking-widest block">Account Dashboard</span>
                  <h3 className="font-display font-black text-lg text-slate-900 dark:text-white capitalize">
                    {userName}
                  </h3>
                </div>
              </div>

              <Button variant="outlined" color="error" onClick={handleLogout} className="h-9 px-4 flex items-center gap-1.5">
                <LogOut size={14} /> Log Out
              </Button>
            </div>

            <Card variant="outlined" className="p-8 text-center space-y-4">
              <div className="p-3 bg-primary/10 text-primary dark:bg-cyan-500/10 dark:text-cyan-400 rounded-full w-fit mx-auto">
                <Truck size={32} />
              </div>
              <h4 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Book a Commercial Goods Vehicle in Goa
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Need to hire a Tata Ace, Pickup, Mini Truck, Tempo, 17/19 Ft Truck, or Construction Material Vehicle?
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <a
                  href="https://wa.me/918806180088?text=Hello%20BhadeKaar!%20I%20would%20like%20to%20book%20a%20goods%20vehicle."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="filled" color="secondary" className="bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2">
                    <MessageCircle size={16} /> Book via WhatsApp (8806180088)
                  </Button>
                </a>
              </div>
            </Card>

            <Card variant="outlined" className="p-6 space-y-4">
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <ClipboardList size={16} className="text-primary" /> Goods Transport Orders
              </h4>
              <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 text-xs">
                No recent booking history found. Create your first commercial goods booking above.
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
