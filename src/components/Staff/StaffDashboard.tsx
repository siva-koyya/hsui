'use client'

import React from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import Link from 'next/link'

interface StaffCard {
  name: string
  role: string
  salary: string
  shiftStatus: 'Shift Open' | 'Shift Closed' | 'Pending Close'
}

export const StaffDashboard: React.FC = () => {
  const summary = {
    active: 8,
    openShifts: 6,
    pendingClose: 2,
  }

  const staffList: StaffCard[] = [
    { name: 'Anita Sharma', role: 'Reception', salary: '₹12,450', shiftStatus: 'Shift Open' },
    { name: 'Rahul Verma', role: 'Queue Management', salary: '₹8,750', shiftStatus: 'Shift Open' },
    { name: 'Meera Patel', role: 'Lab Assistant', salary: '₹6,200', shiftStatus: 'Shift Closed' },
    { name: 'Suresh Kumar', role: 'Reception', salary: '₹9,800', shiftStatus: 'Pending Close' },
    { name: 'Pooja Singh', role: 'Pharmacy', salary: '₹7,650', shiftStatus: 'Shift Open' },
    { name: 'Deepika Rao', role: 'Billing', salary: '₹11,200', shiftStatus: 'Pending Close' },
  ]

  const getSeverity = (status: string) => {
    switch (status) {
      case 'Shift Open':
        return 'success'
      case 'Pending Close':
        return 'warning'
      case 'Shift Closed':
        return 'danger'
      default:
        return 'info'
    }
  }

  // useEffect(() => {
  //   const fetchStaff = async () => {
  //     try {
  //       const res = await fetch('http://localhost:3001/staff')
  //       if (!res.ok) throw new Error('Failed to fetch staff')
  //       const data = await res.json()
  //       setStaffList(data)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   fetchStaff()
  // }, [])

  return (
    <div className="p-4">
      {/* ======= HEADER ======= */}
      <div className="flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="m-0 text-2xl font-bold text-900">Staff / Reception</h2>
          <p className="text-600 m-0">Overview of staff activity and shift status</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link href={"/dashboard/staff/manage"}>
          <Button label="Manage Staff" icon="pi pi-users" className="p-button-info p-button-sm" />
        </Link>
         <Link href={"/dashboard/staff/add"}>
           <Button   label="Add Staff" icon="pi pi-user-plus" className="p-button-success p-button-sm" />
         </Link>
        </div>
      </div>

      {/* ======= SUMMARY CARDS ======= */}
      <div className="grid mb-4">
        <div className="col-12 md:col-4">
          <Card className="shadow-3 border-round-xl text-center">
            <h3 className="m-1 text-green-600">{summary.active}</h3>
            <p className="m-0 text-600">Active</p>
          </Card>
        </div>
        <div className="col-12 md:col-4">
          <Card className="shadow-3 border-round-xl text-center">
            <h3 className="m-1 text-blue-600">{summary.openShifts}</h3>
            <p className="m-0 text-600">Open Shifts</p>
          </Card>
        </div>
        <div className="col-12 md:col-4">
          <Card className="shadow-3 border-round-xl text-center">
            <h3 className="m-1 text-orange-500">{summary.pendingClose}</h3>
            <p className="m-0 text-600">Pending Close</p>
          </Card>
        </div>
      </div>

      {/* ======= STAFF CARDS ======= */}
      <div className="grid">
        {staffList.map((staff, index) => (
          <div key={index} className="col-12 md:col-4 lg:col-3">
            <Card className="shadow-3 border-round-2xl p-3">
              <div className="flex justify-content-between align-items-center mb-2">
                <div>
                  <h4 className="m-0">{staff.name}</h4>
                  <p className="m-0 text-600">{staff.role}</p>
                </div>
                <Tag value={staff.shiftStatus} severity={getSeverity(staff.shiftStatus)} />
              </div>
              <p className="text-lg font-bold text-900 mt-2">{staff.salary}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StaffDashboard
