'use client'
import React from 'react'
import { Button } from 'primereact/button'
import { useRouter } from 'next/navigation'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

export const DashboardHeader: React.FC = () => {
  const router = useRouter()

  return (
    <div
      className="flex flex-column md:flex-row align-items-start md:align-items-center justify-content-between p-4 border-round-xl w-full"
      style={{
        background: 'linear-gradient(90deg, #1E88E5 0%, #1976D2 100%)',
        color: '#fff',
        borderRadius: '16px',
      }}
    >
      {/* Left Section */}
      <div className="mb-3 md:mb-0">
        <h2 className="m-0 text-2xl font-semibold flex align-items-center gap-2">
          Good morning, Dr. Sharma <span>👋</span>
        </h2>
        <p className="m-0 mt-2 text-sm opacity-90">
          Here's today's snapshot for Apollo Medical Center.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap align-items-center gap-2">
        <Button
          label="Add Appointment"
          icon="pi pi-plus"
          className="p-button-sm p-button-rounded p-button-outlined"
          style={{
            backgroundColor: '#fff',
            color: '#1976D2',
            border: 'none',
            fontWeight: 600,
          }}
          onClick={() => router.push('/dashboard/appointments')}
        />

        <Button
          label="Open Queues"
          icon="pi pi-list"
          className="p-button-sm p-button-rounded"
          style={{
            backgroundColor: '#1565C0',
            border: 'none',
            fontWeight: 600,
            color: '#fff',
          }}
          onClick={() => router.push('/dashboard/appointments/queue')}
        />

        <Button
          label="Add Doctor"
          icon="pi pi-user-plus"
          className="p-button-sm p-button-rounded"
          style={{
            backgroundColor: '#0D47A1',
            border: 'none',
            fontWeight: 600,
            color: '#fff',
          }}
          onClick={() => router.push('/dashboard/doctors')}
        />

        <Button
          label="Add Staff"
          icon="pi pi-users"
          className="p-button-sm p-button-rounded"
          style={{
            backgroundColor: '#0D47A1',
            border: 'none',
            fontWeight: 600,
            color: '#fff',
          }}
          onClick={() => router.push('/dashboard/staff')}
        />
      </div>
    </div>
  )
}
