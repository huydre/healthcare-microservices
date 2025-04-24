// src/pages/DashboardPage.jsx
import React from 'react'
import Sidebar           from '../components/Sidebar'
import Header            from '../components/Header'
import ProfileCard       from '../components/ProfileCard'
import PerformanceCard   from '../components/PerformanceCard'
import AnalyticsCard     from '../components/AnalyticsCard'
import ReportsTable      from '../components/ReportsTable'
import Appointments      from '../components/Appointments'

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar className="w-64" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />           {/* search + bell + mail icons */}
        
        <main className="p-6 overflow-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PerformanceCard />   {/* Overall Performance */}
            <AnalyticsCard />     {/* Heart Rate chart */}
            <ProfileCard />       {/* Bên phải: ảnh + thông tin */}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReportsTable />      {/* Lab Reports table + tabs */}
            <Appointments />      {/* Appointment carousel */}
          </div>
        </main>
      </div>
    </div>
  )
}
