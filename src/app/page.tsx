'use client'
import React from 'react'
import Dashboard  from '../components/Dashboard/Dashboard'

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Dashboard/>
    <main>{children}</main>
    </div>
  )
}
export default DashboardLayout