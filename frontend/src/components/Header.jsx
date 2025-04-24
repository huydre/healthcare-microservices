import React from 'react'
import BellIconUrl from '../assets/icons/bell.svg'
import MailIconUrl from '../assets/icons/mail.svg'

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
      {/* Search input */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search patients, invoice, appointments etc"
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-500"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <img src={BellIconUrl} alt="Notifications" className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <img src={MailIconUrl} alt="Messages" className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </header>
  )
}