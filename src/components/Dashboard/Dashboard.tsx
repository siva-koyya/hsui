'use client'

import React, { useEffect, useState } from 'react'
import { StatCard } from './StatCard'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

interface DashboardData {
  appointments: number
  patientsServed: number
  revenue: number
  avgWait: number
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData>({
    appointments: 0,
    patientsServed: 0,
    revenue: 0,
    avgWait: 0,
  })

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch('http://localhost:3001/dashboard')
  //       if (!res.ok) throw new Error('Failed to fetch dashboard data')
  //       const result = await res.json()
  //       setData(result)
  //     } catch (error) {
  //       console.error('Error fetching dashboard data:', error)
  //     }
  //   }

  //   fetchData()
  // }, [])

  return (
    <div className="surface-ground min-h-screen p-4">
      {/* Stat Cards Section */}
      <div className="grid mt-5">
        <div className="col-12 md:col-6 lg:col-3">
          <StatCard
            icon="pi-calendar"
            value={data.appointments}
            change="+12"
            label="Appointments Today"
            subLabel="Time-range bookings"
            positive
          />
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <StatCard
            icon="pi-users"
            value={data.patientsServed}
            change="+8"
            label="Patients Served"
            subLabel="Completed visits"
            positive
          />
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <StatCard
            icon="₹" // Use the actual Rupee symbol
            value={data.revenue}
            change="+15%"
            label="Revenue Today"
            subLabel="Razorpay/UPI included"
            positive
          />
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <StatCard
            icon="pi-clock"
            value={data.avgWait}
            change="+3"
            label="Avg Wait (mins)"
            subLabel="Across active queues"
            positive={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
