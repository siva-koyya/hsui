'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import { Toast } from 'primereact/toast'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import 'primeflex/primeflex.css'

interface Staff {
  id?: number
  name: string
  email: string
  phone: string
  status: 'Active' | 'Inactive'
}

export const StaffManagement: React.FC = () => {
  const toast = useRef<Toast>(null)

  const [staff, setStaff] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [dialogVisible, setDialogVisible] = useState(false)
  const [currentStaff, setCurrentStaff] = useState<Staff | null>(null)

  // -----------------------------
  // Fetch staff from backend
  // -----------------------------
  const fetchStaff = async () => {
    try {
      setLoading(true)
      const res = await fetch('http://localhost:3001/staff')
      if (!res.ok) throw new Error('Failed to fetch staff')
      const data = await res.json()
      setStaff(data)
    } catch (err) {
      console.error(err)
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Could not fetch staff', life: 3000 })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStaff()
  }, [])

  // -----------------------------
  // Save or update staff
  // -----------------------------
  const saveStaff = async () => {
    if (!currentStaff?.name || !currentStaff?.email || !currentStaff?.phone) {
      toast.current?.show({ severity: 'warn', summary: 'Validation', detail: 'Please fill all fields', life: 3000 })
      return
    }

    try {
      const method = currentStaff.id ? 'PUT' : 'POST'
      const url = currentStaff.id
        ? `http://localhost:3001/staff/${currentStaff.id}`
        : `http://localhost:3001/staff`

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentStaff),
      })

      if (!res.ok) throw new Error('Failed to save staff')

      toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Staff saved successfully', life: 3000 })
      setDialogVisible(false)
      setCurrentStaff(null)
      fetchStaff()
    } catch (err) {
      console.error(err)
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Could not save staff', life: 3000 })
    }
  }

  // -----------------------------
  // Delete staff
  // -----------------------------
  const deleteStaff = async (id: number) => {
    if (!confirm('Are you sure you want to delete this staff?')) return
    try {
      const res = await fetch(`http://localhost:3001/staff/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete staff')
      toast.current?.show({ severity: 'success', summary: 'Deleted', detail: 'Staff deleted successfully', life: 3000 })
      fetchStaff()
    } catch (err) {
      console.error(err)
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Could not delete staff', life: 3000 })
    }
  }

  // -----------------------------
  // Activate / Deactivate staff
  // -----------------------------
  const toggleStatus = async (s: Staff) => {
    try {
      const res = await fetch(`http://localhost:3001/staff/${s.id}/activate`, { method: 'PUT' })
      if (!res.ok) throw new Error('Failed to update status')
      toast.current?.show({ severity: 'success', summary: 'Updated', detail: 'Staff status updated', life: 3000 })
      fetchStaff()
    } catch (err) {
      console.error(err)
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Could not update status', life: 3000 })
    }
  }

  // -----------------------------
  // Filtered staff for search
  // -----------------------------
  const filteredStaff = staff.filter(
    (s) =>
      (s.name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      (s.email?.toLowerCase().includes(search.toLowerCase()) ?? false)
  )

  // -----------------------------
  // Bulk add staff example
  // -----------------------------
  const bulkAddStaff = async () => {
    const staffList: Staff[] = [
      { name: 'Anita Sharma', email: 'anita@hospital.com', phone: '9876543210', status: 'Active' },
      { name: 'Rahul Verma', email: 'rahul@hospital.com', phone: '9876543211', status: 'Inactive' },
      { name: 'Meera Patel', email: 'meera@hospital.com', phone: '9876543212', status: 'Active' },
    ]
    try {
      const res = await fetch('http://localhost:3001/staff/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staffList),
      })
      if (!res.ok) throw new Error('Failed to add staff')
      toast.current?.show({ severity: 'success', summary: 'Added', detail: 'Bulk staff added', life: 3000 })
      fetchStaff()
    } catch (err) {
      console.error(err)
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Could not add bulk staff', life: 3000 })
    }
  }

  return (
    <div className="p-4">
      <Toast ref={toast} />

      <div className="flex justify-content-between align-items-center mb-4">
        <h2 className="m-0 text-2xl font-bold text-900">Manage Staff</h2>
        <div className="flex gap-2">
          <Button
            label="Add Staff"
            icon="pi pi-user-plus"
            className="p-button-success p-button-sm"
            onClick={() => {
              setCurrentStaff({ name: '', email: '', phone: '', status: 'Active' })
              setDialogVisible(true)
            }}
          />
          <Button
            label="Bulk Add"
            icon="pi pi-users"
            className="p-button-warning p-button-sm"
            onClick={bulkAddStaff}
          />
        </div>
      </div>

      <Card className="shadow-3 border-round-2xl p-3">
        <div className="flex align-items-center gap-3 mb-4 flex-wrap">
          <InputText
            placeholder="Search by name or email"
            className="w-full md:w-20rem"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button icon="pi pi-search" label="Search" className="p-button-sm" onClick={fetchStaff} />
        </div>

        <DataTable value={filteredStaff} paginator rows={5} stripedRows responsiveLayout="scroll" loading={loading}>
          <Column field="name" header="Full Name" sortable />
          <Column field="email" header="Email Address" sortable />
          <Column field="phone" header="Phone Number" sortable />
          <Column
            field="status"
            header="Status"
            body={(row) => (
              <Tag
                value={row.status}
                severity={row.status === 'Active' ? 'success' : 'danger'}
                style={{ cursor: 'pointer' }}
                onClick={() => row.id && toggleStatus(row)}
              />
            )}
          />
          <Column
            header="Actions"
            body={(row) => (
              <div className="flex gap-2">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-sm p-button-rounded p-button-info"
                  onClick={() => {
                    setCurrentStaff(row)
                    setDialogVisible(true)
                  }}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-sm p-button-rounded p-button-danger"
                  onClick={() => row.id && deleteStaff(row.id)}
                />
              </div>
            )}
          />
        </DataTable>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog
        header={currentStaff?.id ? 'Edit Staff' : 'Add Staff'}
        visible={dialogVisible}
        style={{ width: '400px' }}
        onHide={() => setDialogVisible(false)}
      >
        {currentStaff && (
          <div className="flex flex-column gap-3">
            <InputText
              placeholder="Full Name"
              value={currentStaff.name}
              onChange={(e) => setCurrentStaff({ ...currentStaff, name: e.target.value })}
            />
            <InputText
              placeholder="Email"
              value={currentStaff.email}
              onChange={(e) => setCurrentStaff({ ...currentStaff, email: e.target.value })}
            />
            <InputText
              placeholder="Phone"
              value={currentStaff.phone}
              onChange={(e) => setCurrentStaff({ ...currentStaff, phone: e.target.value })}
            />
            <Dropdown
              value={currentStaff.status}
              options={['Active', 'Inactive']}
              onChange={(e) => setCurrentStaff({ ...currentStaff, status: e.value })}
              placeholder="Select Status"
            />
            <Button label="Save" icon="pi pi-check" className="p-button-success" onClick={saveStaff} />
          </div>
        )}
      </Dialog>
    </div>
  )
}

export default StaffManagement
