'use client'

import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

interface StatCardProps {
  icon: string
  value: string | number
  change: string
  label: string
  subLabel: string
  positive?: boolean
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  change,
  label,
  subLabel,
  positive = true,
}) => {
  const [displayValue, setDisplayValue] = useState<string>(
    typeof value === 'number' ? value.toString() : value
  )

  useEffect(() => {
    if (typeof value === 'number') {
      const formatted =
        label.toLowerCase().includes('revenue')
          ? `₹${value.toLocaleString('en-IN')}`
          : value.toLocaleString()
      setDisplayValue(formatted)
    } else {
      setDisplayValue(value)
    }
  }, [value, label])

  return (
    <Card
      className="shadow-3 border-round-2xl p-4 flex flex-column gap-2rem align-items-start justify-content-between"
      style={{
        background: '#fff',
        minWidth: '220px',
        height: '100%',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="flex align-items-center justify-content-between w-full">
        <i
          className={`pi ${icon}`}
          style={{
            fontSize: '2rem',
            color: '#1976D2',
          }}
        />
      </div>

      <h2 className="mt-3 mb-1 text-3xl font-semibold text-900">{displayValue}</h2>

      <p
        className={`text-sm font-medium ${
          positive ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {change} vs yesterday
      </p>

      <h4 className="mt-2 mb-1 text-lg font-semibold text-800">{label}</h4>

      <span className="text-sm text-600">{subLabel}</span>
    </Card>
  )
}
