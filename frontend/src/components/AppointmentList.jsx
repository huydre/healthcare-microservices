import React, { useState, useEffect } from 'react'
// import api from '../services/api'

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     setLoading(true)
//     api.get('/appointments')
//       .then(res => setAppointments(res.data))
//       .catch(err => console.error(err))
//       .finally(() => setLoading(false))
//   }, [])

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-xl font-medium mb-4">Danh sách lịch khám</h3>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="py-2 text-left">Ngày</th>
              <th className="py-2 text-left">Giờ</th>
              <th className="py-2 text-left">Bác sĩ</th>
              <th className="py-2 text-left">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(a => (
              <tr key={a.id} className="border-b">
                <td className="py-2">{a.date}</td>
                <td className="py-2">{a.time}</td>
                <td className="py-2">{a.doctorName}</td>
                <td className="py-2">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
