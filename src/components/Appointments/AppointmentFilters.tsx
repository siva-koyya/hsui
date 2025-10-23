'use client'

import React from 'react'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

interface FilterProps {
  dept: string | null
  doctor: string | null
  status: string | null
  payment: string | null
  search: string
  setDept: (v: string | null) => void
  setDoctor: (v: string | null) => void
  setStatus: (v: string | null) => void
  setPayment: (v: string | null) => void
  setSearch: (v: string) => void
}

export const AppointmentFilters: React.FC<FilterProps> = ({
  dept,
  doctor,
  status,
  payment,
  search,
  setDept,
  setDoctor,
  setStatus,
  setPayment,
  setSearch,
}) => {
  const departments = ['All Departments', 'Cardiology', 'Neurology', 'Orthopedics']
  const doctors = ['All Doctors', 'Dr. Patel', 'Dr. Kumar', 'Dr. Singh']
  const statuses = ['All Status', 'Current', 'Being Called', 'Waiting', 'Completed']
  const payments = ['All Payments', 'Paid', 'Unpaid']

  return (
    <div className="flex flex-wrap gap-3 mb-4">
    
      <Dropdown value={dept} options={departments} onChange={(e) => setDept(e.value)} placeholder="All Departments" className="w-full md:w-15rem" />
      <Dropdown value={doctor} options={doctors} onChange={(e) => setDoctor(e.value)} placeholder="All Doctors" className="w-full md:w-15rem" />
      <Dropdown value={status} options={statuses} onChange={(e) => setStatus(e.value)} placeholder="All Status" className="w-full md:w-15rem" />
      <Dropdown value={payment} options={payments} onChange={(e) => setPayment(e.value)} placeholder="All Payments" className="w-full md:w-15rem" />
      <span className="p-input-icon-left w-full md:w-20rem">
        <i className="pi pi-search" />
        <InputText
          placeholder="Search by mobile or Booking ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </span>
    </div>
  )
}
