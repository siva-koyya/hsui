'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import { Toast } from 'primereact/toast'
import Link from 'next/link'
import 'primeflex/primeflex.css'

interface Department {
  id: string | null
  name?: string | null
}

interface Doctor {
  id: string
  name: string
  qualification?: string
  specialization?: string
  yearsExperience?: number
  departmentId?: string | null
  department?: Department | null
  startTime?: string
  endTime?: string
  lunchStart?: string
  lunchEnd?: string
  availableDays?: string
  consultationDuration?: number
  consultationFee?: number
  maxPatientsPerDay?: number
}

const DoctorManagement: React.FC = () => {
  const router = useRouter()
  const toast = useRef<Toast>(null)

  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  // Convert ISO time string to HH:MM
  const formatTime = (isoStr?: string) => {
    if (!isoStr) return '—'
    const date = new Date(isoStr)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Fetch doctors
  const fetchDoctors = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3001/doctors') // your API
      if (!res.ok) throw new Error('Failed to fetch doctors')
      const data: Doctor[] = await res.json()
      setDoctors(data)
      console.log(data)
    } catch (err) {
      console.error(err)
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Could not fetch doctors', life: 3000 })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  // Delete doctor
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return
    try {
      const res = await fetch(`http://localhost:3001/doctors/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete doctor')
      toast.current?.show({ severity: 'success', summary: 'Deleted', detail: 'Doctor removed', life: 3000 })
      fetchDoctors()
    } catch (err) {
      console.error(err)
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Could not delete doctor', life: 3000 })
    }
  }

  // Filter doctors by search
  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.department?.name?.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <div className="flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2 className="m-0 text-2xl font-bold text-900">Manage Doctors</h2>
        <Link href="/dashboard/doctors/add">
          <Button label="Add Doctor" icon="pi pi-plus" className="p-button-success p-button-sm" />
        </Link>
      </div>

      <Card className="shadow-3 border-round-2xl p-3">
        <div className="flex align-items-center gap-3 mb-4 flex-wrap">
          <InputText
            placeholder="Search by name, department, or specialization"
            className="w-full md:w-20rem"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button icon="pi pi-search" label="Search" className="p-button-sm" onClick={fetchDoctors} />
        </div>

        <DataTable
          value={filteredDoctors}
          paginator
          rows={5}
          stripedRows
          responsiveLayout="scroll"
          loading={loading}
        >
          <Column field="name" header="Name" sortable />
          <Column
            header="Department"
            body={(row: Doctor) => row.department?.name || '—'}
            sortable
          />
          <Column field="specialization" header="Specialization" sortable />
          <Column field="qualification" header="Qualification" sortable />
          <Column field="yearsExperience" header="Experience (yrs)" sortable />
          <Column
            header="Available Days"
            body={(row: Doctor) => row.availableDays || '—'}
          />
          <Column
            header="Working Hours"
            body={(row: Doctor) => `${formatTime(row.startTime)} - ${formatTime(row.endTime)}`}
          />
          <Column
            header="Lunch Break"
            body={(row: Doctor) => `${formatTime(row.lunchStart)} - ${formatTime(row.lunchEnd)}`}
          />
          <Column field="consultationDuration" header="Consult Duration (min)" />
          <Column field="consultationFee" header="Fee" body={(row) => row.consultationFee ? `₹${row.consultationFee}` : '—'} />
          <Column field="maxPatientsPerDay" header="Max Patients" />
          <Column
            header="Actions"
            body={(row: Doctor) => (
              <div className="flex gap-2">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-sm p-button-rounded p-button-info"
                  onClick={() => router.push(`/dashboard/doctors/edit/${row.id}`)}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-sm p-button-rounded p-button-danger"
                  onClick={() => handleDelete(row.id)}
                />
              </div>
            )}
          />
        </DataTable>
      </Card>
    </div>
  )
}

export default DoctorManagement
