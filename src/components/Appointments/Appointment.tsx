'use client'

import React, { useState, useEffect } from 'react'
import { AppointmentsHeader } from '../Appointments/AppointmentsHeader'
import { AppointmentFilters } from '../Appointments/AppointmentFilters'
import { QueueStatusCard } from '../Appointments/QueueStatusCard'
import { AppointmentTable } from '../Appointments/AppointmentTable'
import { Button } from 'primereact/button'
import Link from 'next/link'

export default function AppointmentsPage() {
  const [filterDate, setFilterDate] = useState('today')
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState<string | null>(null)
  const [doctor, setDoctor] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [payment, setPayment] = useState<string | null>(null)
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch('http://localhost:3001/appointments')
        if (!res.ok) throw new Error('Failed to fetch appointments')
        const data = await res.json()

        // Transform backend data to match AppointmentTable structure
        const processedAppointments = data.map((a: any, index: number) => ({
          id: a.bookingId,
          patient: a.patient?.fullName || '-',
          mobile: a.patient?.mobile || '-',
          department: `Dept ${a.departmentId}`, // Replace with actual department name if available
          doctor: a.doctor?.fullName || 'Unassigned',
          timeRange: `${new Date(a.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(
            new Date(a.scheduledFor).getTime() + a.durationMins * 60000
          ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          position: `#${index + 1}`, // Queue position
          eta: '-', // Optional, can calculate ETA if needed
          payment: '-', // Optional
          status: a.status || 'Waiting'
        }))

        setAppointments(processedAppointments)
      } catch (err: any) {
        console.error(err)
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  return (
    <div className="p-4">
      <div className="flex align-items-center justify-content-end p-3">
        <Link href="/dashboard/appointments/add">
          <Button label="Add Appointment" icon="pi pi-user-plus" className="p-button-success p-button-sm" />
        </Link>
      </div>

      <AppointmentsHeader filterDate={filterDate} setFilterDate={setFilterDate} />

      <AppointmentFilters
        dept={dept}
        doctor={doctor}
        status={status}
        payment={payment}
        search={search}
        setDept={setDept}
        setDoctor={setDoctor}
        setStatus={setStatus}
        setPayment={setPayment}
        setSearch={setSearch}
      />

      <QueueStatusCard />

      {loading ? (
        <p>Loading appointments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <AppointmentTable appointments={appointments} />
      )}
    </div>
  )
}
