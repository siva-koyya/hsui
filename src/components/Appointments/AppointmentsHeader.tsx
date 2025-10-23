'use client'

import React from 'react'
import { Toolbar } from 'primereact/toolbar'
import { Button } from 'primereact/button'

interface HeaderProps {
  filterDate: string
  setFilterDate: (value: string) => void
}

export const AppointmentsHeader: React.FC<HeaderProps> = ({ filterDate, setFilterDate }) => {
  const left = (
    <div className="flex align-items-center gap-2 flex-wrap">
      <h2 className="m-0 text-xl font-bold text-900">Appointments & Queues (Live)</h2>
      <Button icon="pi pi-refresh" label="Refresh" className="p-button-sm p-button-text" />
    </div>
  )

  const right = (
    <div className="flex align-items-center gap-2 flex-wrap">
      {['today', 'upcoming', 'past'].map((type) => (
        <Button
          key={type}
          label={type.charAt(0).toUpperCase() + type.slice(1)}
          className={`p-button-sm ${
            filterDate === type ? 'p-button-info' : 'p-button-outlined'
          }`}
          onClick={() => setFilterDate(type)}
        />
      ))}
    </div>
  )

  return <Toolbar left={left} right={right} className="mb-4 shadow-2 border-round-lg" />
}
