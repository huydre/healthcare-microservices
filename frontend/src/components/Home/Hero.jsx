// src/components/Hero.jsx
import React from 'react'
import doctorImg from '../../assets/doctor.jpg'
import avatar1 from '../../assets/avatar1.jpg'

export default function Hero() {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center px-8 py-16 bg-[#EFFDF4]">
      {/* LEFT */}
      <div className="w-full lg:w-1/2 space-y-6">
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
          Enabling exceptional <span className="bg-green-50">telehealth</span> at every touchpoint
        </h1>
        <p className="text-gray-600">
          Innovative telehealth solutions proven to deliver seamless virtual care.
        </p>
        <div className="flex space-x-4">
          <a href="/get-started"
             className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
            Get Started
          </a>
          <a href="/book"
             className="px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
            Book Discovery Call
          </a>
        </div>

        {/* Avatars & stats */}
        <div className="flex items-center space-x-4 mt-8">
          <div className="flex -space-x-3">
            {[avatar1,avatar1,avatar1,avatar1].map((src,i) => (
              <img key={i} src={src}
                   className="w-10 h-10 rounded-full border-2 border-white" />
            ))}
          </div>
          <div>
            <p className="text-xl font-semibold">1000+ <span className="text-gray-500">happy patients</span></p>
            <a href="/partner" className="flex items-center text-green-600 hover:underline">
              Interested in partnering with us? <span className="ml-1">&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 relative mb-8 lg:mb-0">
        <img src={doctorImg} alt="Doctor" className="w-full rounded-xl shadow-lg" />

        {/* Card 1 */}
        <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-md flex items-center space-x-3">
          <img src={avatar1} className="w-10 h-10 rounded-full" alt="Support"/>
          <div>
            <p className="text-sm font-medium">24/7 Support For Virtual Clinics</p>
            <p className="text-xs text-gray-500">Service #1</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="absolute top-10 right-10 bg-white p-4 rounded-xl shadow-md flex items-center space-x-3">
          {/* Thay bằng icon phù hợp */}
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-sm font-medium">Flexibility & Convenience</p>
        </div>
      </div>
    </section>
  )
}
