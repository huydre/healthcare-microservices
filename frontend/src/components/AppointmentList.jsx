import React, { useState, useEffect } from 'react'
import api from '../services/api'

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true)
      try {
        const role = localStorage.getItem('role') || 'PATIENT'
        const user_id = localStorage.getItem('user_id')
        const res = await api.get('/appointments/', {
          params: { role, user_id }
        })
        setAppointments(res.data)
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchList()
  }, [])

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-xl font-medium mb-4">Danh sách lịch khám</h3>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="py-2 text-left">Ngày giờ</th>
              <th className="py-2 text-left">Bác sĩ</th>
              <th className="py-2 text-left">Lý do</th>
              <th className="py-2 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(a => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{new Date(a.scheduled_time).toLocaleString()}</td>
                <td className="py-2">{a.doctor_name}</td>
                <td className="py-2">{a.reason}</td>
                <td className="py-2 space-x-2 text-center">
                  <button
                    onClick={() => window.location.href = `/dashboard/appointments/${a.id}`}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded"
                  >Chi tiết</button>
                  <button
                    onClick={async () => {
                      if (window.confirm('Bạn có chắc muốn hủy lịch?')) {
                        await api.delete(`/appointments/${a.id}/`)
                        setAppointments(prev => prev.filter(x => x.id !== a.id))
                      }
                    }}
                    className="px-2 py-1 bg-red-100 text-red-700 rounded"
                  >Hủy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
