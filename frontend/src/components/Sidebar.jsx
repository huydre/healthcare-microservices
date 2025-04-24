import React from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIconUrl from '../assets/icons/grid.svg';
import CalendarIconUrl  from '../assets/icons/calendar.svg';
import AnalyticsIconUrl from '../assets/icons/analytics.svg';
import ReportsIconUrl   from '../assets/icons/reports.svg';
import HelpIconUrl      from '../assets/icons/help.svg';

const links = [
  { to: '/dashboard',              icon: DashboardIconUrl, label: 'Dashboard' },
  { to: '/appointments', icon: CalendarIconUrl, label: 'Appointments' },
  { to: '/dashboard/analytics',    icon: AnalyticsIconUrl, label: 'Analytics' },
  { to: '/dashboard/reports',      icon: ReportsIconUrl,   label: 'Reports' },
  { to: '/help',                   icon: HelpIconUrl,      label: 'Help' },
];

export default function Sidebar() {
  return (
    <aside className="bg-white p-6 flex flex-col justify-between">
      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold mb-8"></h1>
        {/* Navigation links */}
        <nav className="space-y-4">
          {links.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <img src={icon} alt={label} className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Admin footer */}
      <div className="mt-8 flex items-center space-x-3">
        <img
          src="/src/assets/avatar-admin.jpg"
          alt="Admin"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-medium">Dr. Sadettin Kupek</p>
          <p className="text-sm text-gray-500">Super Admin</p>
        </div>
      </div>
    </aside>
    );
}