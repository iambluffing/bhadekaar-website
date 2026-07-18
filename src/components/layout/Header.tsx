import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Truck, Phone, ShieldCheck } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-100 dark:bg-slate-950/80 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2.5 font-display font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
              <span className="p-2 bg-gradient-to-br from-primary to-secondary rounded-2xl text-white flex items-center justify-center">
                <Truck size={22} />
              </span>
              BhadeKaar
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 rounded-full font-sans text-sm font-medium transition-all duration-300
                  ${isActive(item.href)
                    ? 'text-primary dark:text-cyan-400 bg-primary/5 dark:bg-cyan-500/10'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900'
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a href="tel:8806180088" className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-cyan-400 px-2 py-1">
              <Phone size={14} className="text-secondary" />
              <span>8806180088</span>
            </a>
            <Link to="/admin" className="p-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-cyan-400 rounded-xl" title="Admin Control Panel">
              <ShieldCheck size={20} />
            </Link>
            <Link to="/login">
              <Button variant="text" color="primary">Login</Button>
            </Link>
            <Link to="/register-driver">
              <Button variant="filled" color="secondary">
                Partner Driver
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-3 transition-colors duration-300">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-2xl font-sans text-base font-medium transition-all
                  ${isActive(item.href)
                    ? 'text-primary dark:text-cyan-400 bg-primary/5 dark:bg-cyan-500/10'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-2xl font-sans text-base font-bold text-cyan-600 dark:text-cyan-400"
            >
              Admin Control Panel
            </Link>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-900 my-2" />

          <div className="grid grid-cols-2 gap-2">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button variant="outlined" color="primary" fullWidth>Login</Button>
            </Link>
            <Link to="/register-customer" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button variant="tonal" color="primary" fullWidth>Sign Up</Button>
            </Link>
            <Link to="/register-driver" onClick={() => setMobileMenuOpen(false)} className="col-span-2 w-full">
              <Button variant="filled" color="secondary" fullWidth>
                Partner Driver Registration
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
