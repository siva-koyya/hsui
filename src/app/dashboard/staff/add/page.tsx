'use client'

import React, { useState, useRef } from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Toast } from 'primereact/toast'

export const AddStaff: React.FC = () => {
  const toast = useRef<Toast>(null)

  const [staff, setStaff] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: '',
  })

  const roles = ['Reception', 'Queue Management', 'Billing', 'Pharmacy', 'Lab Assistant']

  const handleSubmit = async () => {
    // Validation
    if (!staff.fullName || !staff.email || !staff.phone || !staff.password || !staff.role) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill all fields before submitting.',
        life: 3000,
      })
      return
    }

    try {
      const response = await fetch('http://localhost:3001/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staff),
      })

      if (!response.ok) throw new Error('Failed to save staff')

      const data = await response.json()
      toast.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Staff added successfully',
        life: 3000,
      })

      console.log('✅ Staff saved:', data)

      // Reset form
      setStaff({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        role: '',
      })
    } catch (error) {
      console.error('❌ Error:', error)
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to add staff. Please try again.',
        life: 3000,
      })
    }
  }

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <Card className="shadow-3 border-round-2xl p-4">
        <h2 className="text-xl font-semibold mb-4">Add Staff / Reception</h2>

        <div className="grid formgrid">
          <div className="col-12 md:col-6 mb-3">
            <label>Full Name</label>
            <InputText
              className="w-full"
              value={staff.fullName}
              onChange={(e) => setStaff({ ...staff, fullName: e.target.value })}
            />
          </div>

          <div className="col-12 md:col-6 mb-3">
            <label>Email Address</label>
            <InputText
              className="w-full"
              value={staff.email}
              onChange={(e) => setStaff({ ...staff, email: e.target.value })}
            />
          </div>

          <div className="col-12 md:col-6 mb-3">
            <label>Phone Number</label>
            <InputText
              className="w-full"
              value={staff.phone}
              onChange={(e) => setStaff({ ...staff, phone: e.target.value })}
            />
          </div>

          <div className="col-12 md:col-6 mb-3">
            <label>Password</label>
            <Password
              className="w-full"
              toggleMask
              value={staff.password}
              onChange={(e) => setStaff({ ...staff, password: e.target.value })}
              feedback={false}
            />
          </div>

          <div className="col-12 md:col-6 mb-4">
            <label>Role</label>
            <Dropdown
              className="w-full"
              value={staff.role}
              options={roles}
              onChange={(e) => setStaff({ ...staff, role: e.value })}
              placeholder="Select Role"
            />
          </div>

          <div className="col-12">
            <Button
              label="Add Staff"
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

export default AddStaff
