'use client'

import React from 'react'
import { Card } from 'primereact/card'
import { Chart } from 'primereact/chart'

export const AnalyticsOverview: React.FC = () => {
  const doctorData = {
    labels: ['Dr. Ramesh', 'Dr. Meena', 'Dr. Arjun'],
    datasets: [{ data: [25, 30, 15], backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'] }],
  }

  const paymentTrends = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { label: 'Revenue', data: [1200, 1400, 1000, 1800, 1600, 2000, 2200], fill: false, borderColor: '#42A5F5' },
    ],
  }
// const [doctorData, setDoctorData] = useState<{ labels: string[]; datasets: any[] }>({
//     labels: [],
//     datasets: [{ data: [], backgroundColor: [] }],
//   })

//   const [paymentTrends, setPaymentTrends] = useState<{ labels: string[]; datasets: any[] }>({
//     labels: [],
//     datasets: [{ label: 'Revenue', data: [], fill: false, borderColor: '#42A5F5' }],
//   })

//   // Fetch doctor-wise appointments
//   useEffect(() => {
//     const fetchDoctorData = async () => {
//       try {
//         const res = await fetch('http://localhost:3001/analytics/doctor-appointments')
//         const data: DoctorData[] = await res.json()
//         setDoctorData({
//           labels: data.map((d) => d.name),
//           datasets: [
//             {
//               data: data.map((d) => d.appointments),
//               backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#FF7043'],
//             },
//           ],
//         })
//       } catch (err) {
//         console.error('Error fetching doctor data:', err)
//       }
//     }

//     fetchDoctorData()
//   }, [])

//   // Fetch daily revenue trends
//   useEffect(() => {
//     const fetchRevenueData = async () => {
//       try {
//         const res = await fetch('http://localhost:3001/analytics/daily-revenue')
//         const data: RevenueData[] = await res.json()
//         setPaymentTrends({
//           labels: data.map((d) => d.day),
//           datasets: [
//             {
//               label: 'Revenue',
//               data: data.map((d) => d.revenue),
//               fill: false,
//               borderColor: '#42A5F5',
//             },
//           ],
//         })
//       } catch (err) {
//         console.error('Error fetching revenue data:', err)
//       }
//     }

//     fetchRevenueData()
//   }, [])
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-3">Analytics & Reports</h2>

      <div className="grid">
        <div className="col-12 md:col-6">
          <Card title="Doctor-wise Appointments" className="shadow-3 border-round-2xl">
            <Chart type="pie" data={doctorData} />
          </Card>
        </div>

        <div className="col-12 md:col-6">
          <Card title="Daily Revenue Trend" className="shadow-3 border-round-2xl">
            <Chart type="line" data={paymentTrends} />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsOverview
