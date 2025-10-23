'use client'

import React, { useState, useRef } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Toast } from 'primereact/toast'

export const AddAppointment: React.FC<{ onAdd?: () => void }> = ({ onAdd }) => {
  const toast = useRef<Toast>(null)

  const [appointment, setAppointment] = useState({
    patientName: '',
    phone: '',
    department: '',
    doctor: '',
    date: null as Date | null,
    startTime: '',
    endTime: '',
    payment: 'Unpaid',
  })

  const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 'ENT']
  const doctors = ['Dr. Patel', 'Dr. Kumar', 'Dr. Singh', 'Dr. Meena']

  // Helper to parse "12:30 PM" → [hours, minutes]
  const parseTime = (timeStr: string): [number, number] => {
    const [time, modifier] = timeStr.split(' ')
    if (!time || !modifier) return [NaN, NaN]
    let [hours, minutes] = time.split(':').map(Number)
    if (modifier === 'PM' && hours < 12) hours += 12
    if (modifier === 'AM' && hours === 12) hours = 0
    return [hours, minutes]
  }

  const handleSubmit = async () => {
    if (
      !appointment.patientName ||
      !appointment.phone ||
      !appointment.department ||
      !appointment.doctor ||
      !appointment.date ||
      !appointment.startTime ||
      !appointment.endTime
    ) {
      toast.current?.show({ severity: 'warn', summary: 'Validation Error', detail: 'All fields are required', life: 3000 })
      return
    }

    try {
      const [startHours, startMinutes] = parseTime(appointment.startTime)
      const [endHours, endMinutes] = parseTime(appointment.endTime)

      if ([startHours, startMinutes, endHours, endMinutes].some(isNaN)) {
        toast.current?.show({ severity: 'warn', summary: 'Validation Error', detail: 'Invalid time format', life: 3000 })
        return
      }

      const scheduledStart = new Date(appointment.date)
      scheduledStart.setHours(startHours, startMinutes, 0, 0)

      const scheduledEnd = new Date(appointment.date)
      scheduledEnd.setHours(endHours, endMinutes, 0, 0)

      const durationMins = Math.floor((scheduledEnd.getTime() - scheduledStart.getTime()) / 60000)
      if (durationMins <= 0) {
        toast.current?.show({ severity: 'warn', summary: 'Validation Error', detail: 'End time must be after start time', life: 3000 })
        return
      }

      const payload = [
        {
          patient: {
            name: appointment.patientName,
            mobile: appointment.phone,
          },
          department: appointment.department,
          doctor: appointment.doctor,
          scheduledFor: scheduledStart.toISOString(),
          durationMins,
          status: 'Scheduled',
          reason: '',
        },
      ]

      const response = await fetch('http://localhost:3001/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Failed to save appointment')
      await response.json()

      toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Appointment added', life: 3000 })

      // Reset form
      setAppointment({ patientName: '', phone: '', department: '', doctor: '', date: null, startTime: '', endTime: '', payment: 'Unpaid' })

      onAdd?.()
    } catch (error) {
      console.error(error)
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Could not save appointment', life: 3000 })
    }
  }

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <Card className="shadow-3 border-round-2xl p-4">
        <h2 className="text-xl font-semibold mb-4">Add Appointment</h2>
        <div className="grid formgrid">
          <div className="col-12 md:col-6 mb-3">
            <label>Patient Name</label>
            <InputText className="w-full" value={appointment.patientName} onChange={(e) => setAppointment({ ...appointment, patientName: e.target.value })} />
          </div>
          <div className="col-12 md:col-6 mb-3">
            <label>Mobile Number</label>
            <InputText className="w-full" value={appointment.phone} onChange={(e) => setAppointment({ ...appointment, phone: e.target.value })} />
          </div>
          <div className="col-12 md:col-6 mb-3">
            <label>Department</label>
            <Dropdown className="w-full" value={appointment.department} options={departments} onChange={(e) => setAppointment({ ...appointment, department: e.value })} placeholder="Select Department" />
          </div>
          <div className="col-12 md:col-6 mb-3">
            <label>Doctor</label>
            <Dropdown className="w-full" value={appointment.doctor} options={doctors} onChange={(e) => setAppointment({ ...appointment, doctor: e.value })} placeholder="Select Doctor" />
          </div>
          <div className="col-12 md:col-6 mb-3">
            <label>Date</label>
            <Calendar className="w-full" value={appointment.date} onChange={(e) => setAppointment({ ...appointment, date: e.value })} dateFormat="dd-mm-yy" showIcon />
          </div>
          <div className="col-12 md:col-3 mb-3">
            <label>Start Time</label>
            <InputText className="w-full" placeholder="e.g. 12:00 PM" value={appointment.startTime} onChange={(e) => setAppointment({ ...appointment, startTime: e.target.value })} />
          </div>
          <div className="col-12 md:col-3 mb-4">
            <label>End Time</label>
            <InputText className="w-full" placeholder="e.g. 1:00 PM" value={appointment.endTime} onChange={(e) => setAppointment({ ...appointment, endTime: e.target.value })} />
          </div>
          <div className="col-12">
            <Button label="Add Appointment" icon="pi pi-check" className="p-button-success w-full" onClick={handleSubmit} />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AddAppointment
