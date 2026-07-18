import React from 'react';
import { Card } from '../components/ui/Card';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-left space-y-8">
      <div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-450 mt-1">
          Last Updated: July 18, 2026 | BhadeKaar Private Limited
        </p>
      </div>

      <Card variant="outlined" className="p-8 space-y-6 text-sm text-slate-655 dark:text-slate-400 leading-relaxed font-sans">
        <p>
          Welcome to BhadeKaar. These terms and conditions regulate the usage of BhadeKaar Private Limited passenger cabs, logistics loader aggregates, website dashboards, and billing accounts.
        </p>

        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mt-6">
          1. General User Agreements
        </h3>
        <p>
          By creating an account as a passenger, cargo customer, or registered driver partner, you consent to compile with these terms, verifying your phone number via OTP and providing clean, lawful goods.
        </p>

        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mt-6">
          2. Logistics Carrier Restrictions
        </h3>
        <p>
          BhadeKaar loader vehicles (e.g., Tata Ace, Pickup flatbeds) are exclusively licensed for goods carriage. Drivers reserve the right to decline shipment of contraband, explosive chemicals, or items exceeding legal weight limits.
        </p>

        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mt-6">
          3. Fair Billing and Cancellation Policies
        </h3>
        <p>
          Estimated fares are predicted in real-time. Final bills include GST, toll fees, and loading helpers (if checked). Trip cancellations initiated after driver arrival are subject to a ₹50 flat penalty.
        </p>

        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mt-6">
          4. Driver Commission Settlements
        </h3>
        <p>
          Driver partners agree to pay a fixed 15% platform commission on gross trip fares. Settled payouts are processed via weekly automated wire transfers. Persistent poor rating results in account suspension.
        </p>

        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mt-6">
          5. Dispute Arbitration
        </h3>
        <p>
          All legal conflicts shall fall under the jurisdiction of Bengaluru city courts, in the State of Karnataka, India.
        </p>
      </Card>
    </div>
  );
};
