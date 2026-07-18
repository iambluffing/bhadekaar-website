import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const RegisterCustomer: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name) tempErrors.name = 'Full Name / Business Name is required';
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!formData.phone) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      tempErrors.phone = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.agree) tempErrors.agree = 'You must agree to the Terms of Service';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-12 diagonal-bg">
      <Card variant="elevated" className="max-w-md w-full bg-white dark:bg-slate-950 p-8 border-2 border-primary/10 dark:border-cyan-500/10 shadow-xl">
        {success ? (
          <div className="text-center space-y-4 py-8">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
              Account Created!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Redirecting to login portal...
            </p>
          </div>
        ) : (
          <div className="space-y-6 text-left">
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 text-primary dark:bg-cyan-500/10 dark:text-cyan-400 rounded-2xl w-fit mx-auto">
                <UserPlus size={24} />
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
                BhadeKaar Account
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Book commercial goods vehicles in Goa, India
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                label="Full Name / Business Name"
                type="text"
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

              <Input
                label="Mobile Number (India)"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={errors.phone}
                required
              />

              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                required
              />

              <div className="space-y-1">
                <div className="flex items-start gap-2.5">
                  <input
                    id="agree"
                    type="checkbox"
                    checked={formData.agree}
                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary dark:accent-cyan-400 cursor-pointer mt-0.5"
                  />
                  <label htmlFor="agree" className="text-xs text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                    I agree to BhadeKaar's{' '}
                    <Link to="/terms" className="text-primary dark:text-cyan-400 hover:underline font-semibold">Terms of Service</Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary dark:text-cyan-400 hover:underline font-semibold">Privacy Policy</Link>.
                  </label>
                </div>
                {errors.agree && (
                  <span className="text-xxs text-red-500 pl-1 block">{errors.agree}</span>
                )}
              </div>

              <Button type="submit" variant="filled" color="primary" fullWidth className="h-11">
                Sign Up
              </Button>
            </form>

            <div className="h-px bg-slate-100 dark:bg-slate-900 my-4" />

            <div className="text-center text-xs text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary dark:text-cyan-400 hover:underline font-bold">
                Log In
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
