'use client'

import React from 'react'
import { Card } from 'primereact/card'

export const QueueStatusCard = () => (
  <Card className="shadow-3 border-round-2xl mb-4 p-3">
    <div className="flex flex-column md:flex-row justify-content-between align-items-start md:align-items-center gap-3">
      <div>
        <h3 className="m-0 text-2xl font-semibold text-primary">Queue Status:</h3>
        <p className="m-0 text-900 font-medium">
          <b>Dr. Patel - Cardiology</b> | Position <b>#3</b> | Current
        </p>
      </div>
      <div className="text-right">
        <p className="m-0 text-lg font-semibold text-green-600">Priya Sharma</p>
        <p className="m-0 text-700">Being Called • ETA: 15 mins</p>
      </div>
    </div>
  </Card>
)
