'use client'
import React from 'react'
import Dashboard from '@/components/Dashboard/Dashboard'
import AnalyticsOverview from '@/components/Analytics/AnalyticsOverview'
import PaymentDashboard from '@/components/Payment/PaymentDashboard'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard/>
      <AnalyticsOverview />
      <PaymentDashboard />
    </div>
  )
}
