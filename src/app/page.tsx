'use client'
import React from 'react'
import Dashboard  from '../components/Dashboard/Dashboard'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Dashboard/>
    <main>{children}</main>
    </div>
  )
}
