import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  MagnifyingGlassIcon,
  BellIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

export default function Header() {
  const navigate = useNavigate()
  const [notifications] = useState(3)
  const [messages] = useState(5)
  const [userData, setUserData] = useState(null)
  const [userRole, setUserRole] = useState('PATIENT')

  useEffect(() => {
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
  }, [])

  const handleProfileClick = () => {
    navigate('/profile')
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
              userRole === 'ADMIN' ? 'Administrator' : 'User',
        avatar: `https://i.pravatar.cc/150?u=${userData.email || 'user'}`
      }
    }
    
    return {
      name: userRole === 'DOCTOR' ? 'Dr. User' : 'User',
      role: userRole === 'DOCTOR' ? 'Doctor' : 
            userRole === 'PATIENT' ? 'Patient' :
            userRole === 'NURSE' ? 'Nurse' :
            userRole === 'PHARMACIST' ? 'Pharmacist' :
            userRole === 'ADMIN' ? 'Administrator' : 'User',
      avatar: 'https://i.pravatar.cc/150?u=default'
    }
  }

  const userInfo = getUserDisplayInfo()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Section */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients, appointments, reports..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
              Quick Book
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              New Report
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 relative">
              <BellIcon className="h-6 w-6 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {notifications}
                </span>
              )}
            </button>
          </div>

          {/* Messages */}
          <div className="relative">
            <button className="p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 relative">
              <ChatBubbleLeftIcon className="h-6 w-6 text-gray-600" />
              {messages > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {messages}
                </span>
              )}
            </button>
          </div>

          {/* Settings */}
          <button className="p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200">
            <Cog6ToothIcon className="h-6 w-6 text-gray-600" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={handleProfileClick}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <img
                src={userInfo.avatar}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">{userInfo.name}</p>
                <p className="text-xs text-gray-500">{userInfo.role}</p>
              </div>
              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}