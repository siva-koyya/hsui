'use client'
import React from 'react'
import AnalyticsOverview from '@/components/Analytics/AnalyticsOverview'
import PaymentDashboard from '@/components/Payment/PaymentDashboard'

export default function DashboardPage() {
  return (
    <div className="p-4 gap-4">
      <AnalyticsOverview />
      <PaymentDashboard />
    </div>
  )
}
