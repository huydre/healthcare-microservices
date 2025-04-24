import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import AppointmentBookingForm from '../components/AppointmentBookingForm'
import AppointmentList from '../components/AppointmentList'

export default function AppointmentPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-6 overflow-auto space-y-6">
          <h2 className="text-2xl font-semibold">Appointments</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AppointmentBookingForm />
            <AppointmentList />
          </div>
        </main>
      </div>
    </div>
  )
}