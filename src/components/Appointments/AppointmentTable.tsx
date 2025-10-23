'use client'

import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import { Card } from 'primereact/card'

interface Appointment {
  id: string
  patient: string
  mobile: string
  department: string
  doctor: string
  timeRange: string
  position: string
  eta: string
  payment: string
  status: string
}

interface TableProps {
  appointments: Appointment[]
}

export const AppointmentTable: React.FC<TableProps> = ({ appointments }) => {
  const statusTemplate = (row: Appointment) => {
    const severity =
      row.status === 'Current'
        ? 'success'
        : row.status === 'Being Called'
        ? 'warning'
        : row.status === 'Waiting'
        ? 'info'
        : 'secondary'
    return <Tag value={row.status} severity={severity} />
  }

  const actionTemplate = () => (
    <div className="flex gap-2">
      <Button label="View" icon="pi pi-eye" className="p-button-sm p-button-rounded p-button-info" />
      <Button label="Reschedule" icon="pi pi-calendar" className="p-button-sm p-button-rounded p-button-warning" />
      <Button label="Cancel" icon="pi pi-times" className="p-button-sm p-button-rounded p-button-danger" />
    </div>
  )

  return (
    <Card className="shadow-3 border-round-2xl p-3">
      <DataTable value={appointments} paginator rows={5} stripedRows responsiveLayout="scroll" className="text-sm">
        <Column field="id" header="Booking ID" sortable />
        <Column
          header="Patient"
          body={(row) => (
            <>
              <div className="font-semibold">{row.patient}</div>
              <small>{row.mobile}</small>
            </>
          )}
        />
        <Column header="Department → Doctor" body={(row) => `${row.department} → ${row.doctor}`} />
        <Column field="timeRange" header="Time Range" />
        <Column
          header="Queue Status"
          body={(row) => (
            <div>
              <div>{row.position}</div>
              <small>{row.eta}</small>
            </div>
          )}
        />
        <Column field="payment" header="Payment" />
        <Column field="status" header="Status" body={statusTemplate} />
        <Column header="Actions" body={actionTemplate} />
      </DataTable>
    </Card>
  )
}
