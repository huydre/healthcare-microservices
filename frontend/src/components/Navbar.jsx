// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchIconUrl from '../assets/icons/search.svg';

const services = [
  { label: 'Đặt lịch khám', to: '/dashboard?tab=book' },
  { label: 'Xem lịch khám', to: '/dashboard?tab=view' },
  { label: 'Hồ sơ bệnh án', to: '/medical-records' },
];

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const servicesRef = useRef();

  // Click outside để đóng dropdown
  useEffect(() => {
    const handler = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <nav className="relative z-50 bg-white shadow px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Desktop Links */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-green-900">
            HealthCare
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center space-x-6">
            <li>
              <Link to="/" className="hover:text-green-600">
                Home
              </Link>
            </li>

            {/* Services với dropdown */}
            <li
              className="relative"
              ref={servicesRef}
            >
              <button
                onClick={() => setServicesOpen(o => !o)}
                className="flex items-center space-x-1 hover:text-green-600 focus:outline-none"
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    servicesOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {servicesOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {services.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700"
                        onClick={() => setServicesOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <Link to="/about" className="hover:text-green-600">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Search + Auth + Mobile button */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <img
              src={SearchIconUrl}
              alt="Search"
              className="w-6 h-6 text-gray-600"
            />
          </button>

          <Link
            to="/login"
            className="px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200"
          >
            Login
          </Link>

          {/* Mobile menu icon */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
          <ul className="space-y-1 px-4 py-3">
            <li>
              <Link
                to="/"
                className="block px-2 py-2 rounded hover:bg-green-50"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <button
                onClick={() => setServicesOpen(o => !o)}
                className="w-full text-left px-2 py-2 rounded hover:bg-green-50 flex justify-between items-center"
              >
                Services
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    servicesOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {servicesOpen && (
                <ul className="mt-1 space-y-1 pl-4">
                  {services.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="block px-2 py-2 rounded hover:bg-green-100"
                        onClick={() => {
                          setServicesOpen(false);
                          setMobileOpen(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/about"
                className="block px-2 py-2 rounded hover:bg-green-50"
                onClick={() => setMobileOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block px-2 py-2 rounded hover:bg-green-50"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
