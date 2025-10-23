'use client'

import React from 'react'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'

export const PaymentDashboard: React.FC = () => {
  const payments = [
    {
      bookingId: 'B1234',
      name: 'Amit Joshi',
      date: '2025-10-17',
      amount: '₹800',
      mode: 'Online',
      transactionId: 'TXN984562',
    },
  ]

  const analytics = {
    todayRevenue: '₹14,500',
    online: '₹9,200',
    offline: '₹5,300',
    topDepartments: ['Cardiology', 'Dermatology', 'ENT'],
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-3">Payments & Transactions</h2>

      {/* Summary Widgets */}
      <div className="grid mb-4">
        <div className="col-12 md:col-3">
          <Card className="text-center shadow-3 border-round-2xl">
            <h3>{analytics.todayRevenue}</h3>
            <p>Today’s Revenue</p>
          </Card>
        </div>
        <div className="col-12 md:col-3">
          <Card className="text-center shadow-3 border-round-2xl">
            <h3>{analytics.online}</h3>
            <p>Online Payments</p>
          </Card>
        </div>
        <div className="col-12 md:col-3">
          <Card className="text-center shadow-3 border-round-2xl">
            <h3>{analytics.offline}</h3>
            <p>Offline Payments</p>
          </Card>
        </div>
        <div className="col-12 md:col-3">
          <Card className="text-center shadow-3 border-round-2xl">
            <h3>{analytics.topDepartments.join(', ')}</h3>
            <p>Top Departments</p>
          </Card>
        </div>
      </div>

      {/* Payment Table */}
      <Card className="shadow-3 border-round-2xl p-3">
        <div className="flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Payment Records</h3>
          <div className="flex gap-2">
            <Button label="Export PDF" icon="pi pi-file-pdf" className="p-button-danger p-button-sm" />
            <Button label="Export Excel" icon="pi pi-file-excel" className="p-button-success p-button-sm" />
          </div>
        </div>

        <DataTable value={payments} paginator rows={5} stripedRows>
          <Column field="bookingId" header="Booking ID" />
          <Column field="name" header="Patient Name" />
          <Column field="date" header="Date/Time" />
          <Column field="amount" header="Amount" />
          <Column field="transactionId" header="Transaction ID" />
          <Column field="mode" header="Mode" />
        </DataTable>
      </Card>
    </div>
  )
}

export default PaymentDashboard
