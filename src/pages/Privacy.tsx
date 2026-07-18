import React from 'react';
import { Card } from '../components/ui/Card';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-left space-y-8">
      <div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-450 mt-1">
          Effective Date: July 18, 2026 | BhadeKaar Private Limited
        </p>
      </div>

      <Card variant="outlined" className="p-8 space-y-6 text-sm text-slate-650 dark:text-slate-400 leading-relaxed font-sans">
        <p>
          At <strong>BhadeKaar Private Limited</strong>, we value the trust you place in us. This Privacy Policy details how we collect, handle, secure, and share customer location metrics, vehicle partner logs, KYC uploads, and financial transactions.
        </p>

        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mt-6">
          1. Information We Collect
        </h3>
        <p>
          We capture data necessary to provide reliable cab rides and cargo dispatching:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Location Information:</strong> Precise pickup and destination coordinates are mapped to match you with closest drivers and support live route sharing.</li>
          <li><strong>Onboarding KYC:</strong> Driver partner license scans, RC copies, insurance, and banking logs required to run legally.</li>
          <li><strong>Contact Details:</strong> Full name, phone numbers, and email accounts utilized for invoices and OTP verification.</li>
        </ul>

        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mt-6">
          2. How We Use Information
        </h3>
        <p>
          Your information is deployed to optimize taxi/cargo matches, compute billing receipts with transparent tax margins, and issue weekly settlement payouts.
        </p>

        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mt-6">
          3. Information Sharing
        </h3>
        <p>
          Location data is shared with the matched driver to guide them to your pickup point. Financial payments are processed via secured PCI-compliant gateways. We do not sell user data.
        </p>

        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mt-6">
          4. Contact Support
        </h3>
        <p>
          For queries concerning user profile deletions or location sharing configurations, write to us at <a href="mailto:privacy@bhadekaar.com" className="text-primary dark:text-cyan-400 hover:underline font-semibold">privacy@bhadekaar.com</a>.
        </p>
      </Card>
    </div>
  );
};
