// src/components/Solutions.jsx
import React, { useState } from 'react'

const tabGroup1 = ['Virtual','Provider staffing']
const tabGroup2 = ['Telemedicine','Platform']

const features = [
  { title: 'Virtual Solutions For Brick And Mortar', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
  </svg>
    )
  },
  { title: '50 State Coverage', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
  </svg>
  },
  { title: 'EHR/EMR', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
  </svg>
  },
  { title: 'E-Prescribe', icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
  </svg>
   },
]

export default function Solutions() {
  const [active1, setActive1] = useState(tabGroup1[0])
  const [active2, setActive2] = useState(tabGroup2[0])

  return (
    <section className="px-8 py-16">
      <h2 className="text-3xl font-semibold text-gray-300 text-center">
        Full range of solutions to effectively enhance your{" "}
        <span className="text-gray-900">virtual care</span>.
      </h2>
      <p className="text-center text-gray-500 mt-2">
        Discover AyaRX’s expertly crafted white-label solutions.
      </p>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mt-8">
        {tabGroup1.map(tab => (
          <button
            key={tab}
            onClick={() => setActive1(tab)}
            className={`px-6 py-2 rounded-full ${
              active1===tab ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
        {tabGroup2.map(tab => (
          <button
            key={tab}
            onClick={() => setActive2(tab)}
            className={`px-6 py-2 rounded-full ${
              active2===tab ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {features.map((f,i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
            <div className="mb-4">{f.icon}</div>
            <h3 className="font-medium">{f.title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
