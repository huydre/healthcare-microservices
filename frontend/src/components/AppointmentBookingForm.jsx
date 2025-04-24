import React, { useState, useEffect } from 'react'
import api from '../services/api'

export default function AppointmentBookingForm() {
  const [form, setForm] = useState({ date: '', time: '', doctor: '', reason: '' })
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/doctors/')
      .then(res => setDoctors(res.data))
      .catch(err => console.error('Error fetching doctors:', err))
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const patient_id = parseInt(localStorage.getItem('user_id'), 10)
      const scheduled_time = new Date(`${form.date}T${form.time}`).toISOString()
      await api.post('/appointments/create/', {
        doctor_id: form.doctor,
        scheduled_time,
        reason: form.reason
      })
      alert('Đặt lịch khám thành công')
      setForm({ date: '', time: '', doctor: '', reason: '' })
    } catch (err) {
      console.error('Error creating appointment:', err)
      setError('Đăng ký thất bại. Vui lòng thử lại.')
    }
    setLoading(false)
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-xl font-medium mb-4">Đặt lịch khám</h3>
      {error && <p className="text-red-600 mb-2">{error}</p>}
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
              <option key={d.id} value={d.id}>
                {d.username} ({d.email})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Lý do khám</label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Nhập lý do khám"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Đang gửi...' : 'Đặt lịch'}
        </button>
      </form>
    </div>
  )
}