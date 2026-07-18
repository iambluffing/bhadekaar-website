import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 dark:bg-slate-950 dark:text-slate-500 border-t border-slate-800 dark:border-slate-900 transition-colors duration-300">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-left">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-2xl tracking-tight text-white">
            <span className="p-2 bg-gradient-to-br from-primary to-secondary rounded-2xl text-white flex items-center justify-center">
              <Truck size={22} />
            </span>
            BhadeKaar
          </Link>
          <p className="text-sm leading-relaxed max-w-sm">
            BhadeKaar is a commercial goods transport service provider based in Goa, India. We connect businesses and individuals with reliable goods vehicles ranging from Tata Ace to heavy 19ft trucks and construction material vehicles.
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="https://wa.me/918806180088"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>
        </div>

        {/* Links Columns */}
        <div>
          <h4 className="font-display font-semibold text-sm text-white tracking-wider uppercase mb-4">Supported Fleets</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-white transition-colors">Tata Ace</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Pickup & Mini Truck</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Tempo Goods</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">17 & 19 Feet Trucks</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Construction Vehicles</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm text-white tracking-wider uppercase mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About BhadeKaar</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">Help & FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            <li><Link to="/register-driver" className="hover:text-white transition-colors">Driver Partner</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm text-white tracking-wider uppercase mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Contacts Banner */}
      <div className="bg-slate-950 dark:bg-black/40 py-6 border-t border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex flex-wrap justify-center gap-6 text-slate-400">
            <a href="tel:8806180088" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone size={12} className="text-secondary" /> +91 8806180088
            </a>
            <a href="mailto:info@bhadekaar.com" className="flex items-center gap-1 hover:text-white transition-colors">
              <Mail size={12} className="text-secondary" /> info@bhadekaar.com
            </a>
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-secondary" /> Goa, India
            </span>
          </div>
          <p className="text-slate-500">
            &copy; {currentYear} BhadeKaar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
