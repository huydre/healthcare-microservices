// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react'
import Sidebar           from '../components/Sidebar'
import Header            from '../components/Header'
import ProfileCard       from '../components/ProfileCard'
import PerformanceCard   from '../components/PerformanceCard'
import AnalyticsCard     from '../components/AnalyticsCard'
import ReportsTable      from '../components/ReportsTable'
import Appointments      from '../components/Appointments'
import { getDashboardStats, getAppointmentStats } from '../services/api'
import { 
  CalendarDaysIcon, 
  UserGroupIcon, 
  ClockIcon,
  ArrowTrendingUpIcon,
  HeartIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [userData, setUserData] = useState(null)
  const [userRole, setUserRole] = useState('PATIENT')
  const [dashboardStats, setDashboardStats] = useState(null)
  const [appointmentStats, setAppointmentStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    
    // Get user data from localStorage
    const userDataStr = localStorage.getItem('user_data')
    const role = localStorage.getItem('user_role') || 'PATIENT'
    
    setUserRole(role)
    
    if (userDataStr) {
      try {
        setUserData(JSON.parse(userDataStr))
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }

    // Fetch dashboard stats from API
    fetchDashboardStats()
    
    return () => clearInterval(timer)
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const userId = localStorage.getItem('user_id')
      const userType = userRole.toLowerCase()

      // Fetch stats from both services
      const [userStatsResponse, appointmentStatsResponse] = await Promise.allSettled([
        getDashboardStats(),
        userId && (userType === 'doctor' || userType === 'patient') 
          ? getAppointmentStats(userType, userId)
          : Promise.resolve({ data: {} })
      ])

      // Combine stats from both services
      const userStats = userStatsResponse.status === 'fulfilled' ? userStatsResponse.value.data : {}
      const appointmentStats = appointmentStatsResponse.status === 'fulfilled' ? appointmentStatsResponse.value.data : {}

      const combinedStats = { ...userStats, ...appointmentStats }
      
      setDashboardStats(combinedStats)
      setAppointmentStats(appointmentStats)
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      // Use fallback data if API fails
      setDashboardStats(getFallbackStats())
    } finally {
      setLoading(false)
    }
  }

  const getFallbackStats = () => {
    if (userRole === 'DOCTOR') {
      return {
        total_patients: 42,
        todays_appointments: 8,
        pending_reports: 3,
        success_rate: 94.2
      }
    } else if (userRole === 'PATIENT') {
      return {
        upcoming_appointments: 2,
        completed_appointments: 12,
        medical_records: 5,
        health_score: 85.5
      }
    }
    return {
      total_users: 150,
      total_doctors: 25,
      total_patients: 120,
      system_health: 98.5
    }
  }

  const getUserDisplayInfo = () => {
    if (userData) {
      const fullName = `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.username
      return {
        name: userRole === 'DOCTOR' ? `Dr. ${fullName}` : fullName,
        role: userRole === 'DOCTOR' ? 'Doctor' : 
              userRole === 'PATIENT' ? 'Patient' :
              userRole === 'NURSE' ? 'Nurse' :
              userRole === 'PHARMACIST' ? 'Pharmacist' :
              userRole === 'ADMIN' ? 'Administrator' : 'User'
      }
    }
    
    return {
      name: userRole === 'DOCTOR' ? 'Dr. User' : 'User',
      role: userRole === 'DOCTOR' ? 'Doctor' : 
            userRole === 'PATIENT' ? 'Patient' :
            userRole === 'NURSE' ? 'Nurse' :
            userRole === 'PHARMACIST' ? 'Pharmacist' :
            userRole === 'ADMIN' ? 'Administrator' : 'User'
    }
  }

  const user = getUserDisplayInfo()

  const getStatsCards = () => {
    if (!dashboardStats) return []

    if (userRole === 'DOCTOR') {
      // Use appointment service data when available, fallback to user service data
      const totalPatients = appointmentStats?.total_patients ?? dashboardStats.total_patients ?? 0
      const todaysAppointments = appointmentStats?.todays_appointments ?? dashboardStats.todays_appointments ?? 0
      const pendingReports = appointmentStats?.pending_reports ?? dashboardStats.pending_reports ?? 0
      const successRate = appointmentStats?.success_rate ?? dashboardStats.success_rate ?? 0

      return [
        {
          title: 'Total Patients',
          value: totalPatients.toString(),
          change: '+12%',
          changeType: 'increase',
          icon: UserGroupIcon,
          color: 'blue'
        },
        {
          title: 'Today\'s Appointments',
          value: todaysAppointments.toString(),
          change: '+3',
          changeType: 'increase',
          icon: CalendarDaysIcon,
          color: 'green'
        },
        {
          title: 'Pending Reports',
          value: pendingReports.toString(),
          change: '-2',
          changeType: 'decrease',
          icon: ClockIcon,
          color: 'yellow'
        },
        {
          title: 'Success Rate',
          value: `${successRate}%`,
          change: '+2.1%',
          changeType: 'increase',
          icon: ArrowTrendingUpIcon,
          color: 'purple'
        }
      ]
    } else if (userRole === 'PATIENT') {
      // Use appointment service data when available, fallback to user service data
      const upcomingAppointments = appointmentStats?.upcoming_appointments ?? dashboardStats.upcoming_appointments ?? 0
      const completedAppointments = appointmentStats?.completed_appointments ?? dashboardStats.completed_appointments ?? 0
      const totalAppointments = appointmentStats?.total_appointments ?? dashboardStats.total_appointments ?? 0
      const healthScore = dashboardStats.health_score ?? 85

      return [
        {
          title: 'Upcoming Appointments',
          value: upcomingAppointments.toString(),
          change: '+1',
          changeType: 'increase',
          icon: CalendarDaysIcon,
          color: 'blue'
        },
        {
          title: 'Completed Visits',
          value: completedAppointments.toString(),
          change: '+2',
          changeType: 'increase',
          icon: ArrowTrendingUpIcon,
          color: 'green'
        },
        {
          title: 'Total Appointments',
          value: totalAppointments.toString(),
          change: '+3',
          changeType: 'increase',
          icon: ClockIcon,
          color: 'yellow'
        },
        {
          title: 'Health Score',
          value: `${healthScore}%`,
          change: '+3.2%',
          changeType: 'increase',
          icon: HeartIcon,
          color: 'purple'
        }
      ]
    } else {
      return [
        {
          title: 'Total Users',
          value: dashboardStats.total_users?.toString() || '0',
          change: '+5%',
          changeType: 'increase',
          icon: UserGroupIcon,
          color: 'blue'
        },
        {
          title: 'Total Doctors',
          value: dashboardStats.total_doctors?.toString() || '0',
          change: '+2',
          changeType: 'increase',
          icon: UserGroupIcon,
          color: 'green'
        },
        {
          title: 'Total Patients',
          value: dashboardStats.total_patients?.toString() || '0',
          change: '+8',
          changeType: 'increase',
          icon: UserGroupIcon,
          color: 'yellow'
        },
        {
          title: 'System Health',
          value: `${dashboardStats.system_health?.toString() || '0'}%`,
          change: '+0.5%',
          changeType: 'increase',
          icon: HeartIcon,
          color: 'purple'
        }
      ]
    }
  }

  const statsCards = getStatsCards()

  if (loading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading dashboard...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const getColorClasses = (color, variant = 'primary') => {
    const colors = {
      blue: {
        primary: 'bg-blue-500',
        light: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200'
      },
      green: {
        primary: 'bg-green-500',
        light: 'bg-green-50',
        text: 'text-green-600',
        border: 'border-green-200'
      },
      yellow: {
        primary: 'bg-yellow-500',
        light: 'bg-yellow-50',
        text: 'text-yellow-600',
        border: 'border-yellow-200'
      },
      purple: {
        primary: 'bg-purple-500',
        light: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200'
      }
    }
    return colors[color]?.[variant] || colors.blue[variant]
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Sidebar className="w-64" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto">
          {/* Welcome Section */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Welcome back, {user.name}! 👋
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Here's what's happening with your practice today
                  </p>
                  <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <CalendarDaysIcon className="h-4 w-4" />
                      <span>{currentTime.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>{currentTime.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}</span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">98.5%</div>
                    <div className="text-sm text-gray-500">System Health</div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <HeartIcon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsCards.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <span className={`text-sm font-medium ${
                          stat.changeType === 'increase' ? 'text-green-600' : 'text-red-500'
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">from last month</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 ${getColorClasses(stat.color, 'light')} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 ${getColorClasses(stat.color, 'text')}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Dashboard Content */}
            <div className="space-y-8">
              {/* Top Row - Performance, Analytics, Profile */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <PerformanceCard />
                <AnalyticsCard />
                <ProfileCard />
              </div>
              
              {/* Bottom Row - Reports and Appointments */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReportsTable />
                <Appointments />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
