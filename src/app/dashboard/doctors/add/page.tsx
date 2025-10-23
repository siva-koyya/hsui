'use client'

import React, { useState, useRef, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { Calendar } from 'primereact/calendar'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Toast } from 'primereact/toast'

interface Department {
  id: number
  name: string
}

const AddDoctorPage: React.FC = () => {
  const toast = useRef<Toast>(null)

  const departmentData: Department[] = [
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Neurology' },
    { id: 3, name: 'Orthopedics' },
    { id: 4, name: 'Dermatology' },
    { id: 5, name: 'ENT' },
    { id: 6, name: 'General Medicine' },
  ]

  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)

  const [doctor, setDoctor] = useState({
    name: '',
    qualification: '',
    departmentId: 0,
    specialization: '',
    experience: 0,
    fee: 0,
    availableDays: [] as string[],
    startTime: null as Date | null,
    endTime: null as Date | null,
    lunchStart: null as Date | null,
    lunchEnd: null as Date | null,
    duration: 15,
    maxPatients: 20,
  })

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  useEffect(() => {
    setDepartments(departmentData)
    setLoading(false)
  }, [])

  const handleSubmit = async () => {
    if (
      !doctor.name ||
      !doctor.qualification ||
      !doctor.departmentId ||
      !doctor.specialization ||
      !doctor.startTime ||
      !doctor.endTime ||
      !doctor.lunchStart ||
      !doctor.lunchEnd ||
      doctor.availableDays.length === 0
    ) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill all required fields',
        life: 3000,
      })
      return
    }

    try {
      const response = await fetch('http://localhost:3001/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...doctor,
          startTime: doctor.startTime?.toISOString(),
          endTime: doctor.endTime?.toISOString(),
          lunchStart: doctor.lunchStart?.toISOString(),
          lunchEnd: doctor.lunchEnd?.toISOString(),
        }),
      })

      if (!response.ok) throw new Error('Failed to save doctor')

      await response.json()

      toast.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Doctor added successfully',
        life: 3000,
      })

      // Reset form
      setDoctor({
        name: '',
        qualification: '',
        departmentId: 0,
        specialization: '',
        experience: 0,
        fee: 0,
        availableDays: [],
        startTime: null,
        endTime: null,
        lunchStart: null,
        lunchEnd: null,
        duration: 15,
        maxPatients: 20,
      })
    } catch (error) {
      console.error('Error saving doctor:', error)
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Could not save doctor',
        life: 3000,
      })
    }
  }

  if (loading) return <div className="p-4">Loading departments...</div>

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <Card className="shadow-3 border-round-2xl p-4">
        <h2 className="text-xl font-semibold mb-4">Add New Doctor</h2>
        <div className="grid formgrid">
          <div className="col-12 md:col-6 mb-3">
            <label>Name</label>
            <InputText
              className="w-full"
              value={doctor.name}
              onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
            />
          </div>

          <div className="col-12 md:col-6 mb-3">
            <label>Qualification</label>
            <InputText
              className="w-full"
              value={doctor.qualification}
              onChange={(e) => setDoctor({ ...doctor, qualification: e.target.value })}
            />
          </div>

          <div className="col-12 md:col-6 mb-3">
            <label>Department</label>
            <Dropdown
              className="w-full"
              value={doctor.departmentId}
              options={departments.map((d) => ({ label: d.name, value: d.id }))}
              onChange={(e) => setDoctor({ ...doctor, departmentId: e.value })}
              placeholder="Select Department"
            />
          </div>

          <div className="col-12 md:col-6 mb-3">
            <label>Specialization</label>
            <InputText
              className="w-full"
              value={doctor.specialization}
              onChange={(e) => setDoctor({ ...doctor, specialization: e.target.value })}
            />
          </div>

          <div className="col-12 md:col-4 mb-3">
            <label>Experience (Years)</label>
            <InputNumber
              className="w-full"
              value={doctor.experience}
              onValueChange={(e) => setDoctor({ ...doctor, experience: e.value ?? 0 })}
            />
          </div>

          <div className="col-12 md:col-4 mb-3">
            <label>Consultation Fee (₹)</label>
            <InputNumber
              className="w-full"
              value={doctor.fee}
              onValueChange={(e) => setDoctor({ ...doctor, fee: e.value ?? 0 })}
            />
          </div>

          <div className="col-12 md:col-4 mb-3">
            <label>Duration per Patient (mins)</label>
            <InputNumber
              className="w-full"
              value={doctor.duration}
              onValueChange={(e) => setDoctor({ ...doctor, duration: e.value ?? 0 })}
            />
          </div>

          <div className="col-12 md:col-6 mb-3">
            <label>Available Days</label>
            <Dropdown
              className="w-full"
              multiple
              value={doctor.availableDays}
              options={days.map((d) => ({ label: d, value: d }))}
              onChange={(e) => setDoctor({ ...doctor, availableDays: e.value })}
              placeholder="Select Days"
            />
          </div>

          <div className="col-12 md:col-6 mb-3">
            <label>Max Patients / Day</label>
            <InputNumber
              className="w-full"
              value={doctor.maxPatients}
              onValueChange={(e) => setDoctor({ ...doctor, maxPatients: e.value ?? 0 })}
            />
          </div>

          <div className="col-12 md:col-6 mb-3">
            <label>Start Time</label>
            <Calendar
              className="w-full"
              timeOnly
              value={doctor.startTime}
              onChange={(e) => setDoctor({ ...doctor, startTime: e.value })}
            />
          </div>

          <div className="col-12 md:col-6 mb-3">
            <label>End Time</label>
            <Calendar
              className="w-full"
              timeOnly
              value={doctor.endTime}
              onChange={(e) => setDoctor({ ...doctor, endTime: e.value })}
            />
          </div>

          <div className="col-12 md:col-6 mb-3">
            <label>Lunch Break Start</label>
            <Calendar
              className="w-full"
              timeOnly
              value={doctor.lunchStart}
              onChange={(e) => setDoctor({ ...doctor, lunchStart: e.value })}
            />
          </div>

          <div className="col-12 md:col-6 mb-4">
            <label>Lunch Break End</label>
            <Calendar
              className="w-full"
              timeOnly
              value={doctor.lunchEnd}
              onChange={(e) => setDoctor({ ...doctor, lunchEnd: e.value })}
            />
          </div>

          <div className="col-12">
            <Button
              label="Add Doctor"
              icon="pi pi-check"
              className="p-button-success w-full"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AddDoctorPage
