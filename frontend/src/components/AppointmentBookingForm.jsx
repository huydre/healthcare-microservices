import React, { useState, useEffect } from 'react'
// import api from '../services/api'

export default function AppointmentBookingForm() {
  const [form, setForm] = useState({ date: '', time: '', doctor: '' })
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     api.get('/doctors')
//       .then(res => setDoctors(res.data))
//       .catch(err => console.error(err))
//   }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    api.post('/appointments', form)
      .then(() => {
        alert('Đăng ký thành công')
        setForm({ date: '', time: '', doctor: '' })
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-xl font-medium mb-4">Đăng ký lịch khám</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Chọn ngày</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Chọn giờ</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Chọn bác sĩ</label>
          <select
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">-- Chọn bác sĩ --</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
      </form>
    </div>
  )
}
