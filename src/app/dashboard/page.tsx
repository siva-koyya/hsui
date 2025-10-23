// app/dashboard/page.tsx
'use client';

import React from 'react';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import Dashboard from '@/components/Dashboard/Dashboard';
import AnalyticsOverview from '@/components/Analytics/AnalyticsOverview';
import PaymentDashboard from '@/components/Payment/PaymentDashboard';

export default function DashboardPage() {
  return (
    <div className=" min-h-screen bg-gray-50 p-4 gap-4">
      {/* Dashboard Header */}
      {/* <DashboardHeader /> */}
      <Dashboard/>
      <AnalyticsOverview/>
      <PaymentDashboard/>
      {/* Main Admin Dashboard Content */}
      {/* <div className="flex-1">
        <AdminDashboard />
      </div> */}
    </div>
  );
}
