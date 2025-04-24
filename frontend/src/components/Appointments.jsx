// src/components/Appointments.jsx
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const list = [
  { date: '19 Mon', doctor: 'Dr. Ziccardi', time: '17:00', specialty: 'Cardiologist' },
]

export default function Appointments() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h4 className="font-semibold mb-4">Appointments</h4>
      <Swiper slidesPerView={3} spaceBetween={12}>
        {list.map((a,i)=>(
          <SwiperSlide key={i}>
            <div className="p-4 border rounded-lg">
              <div className="text-center mb-2">{a.date}</div>
              <hr className="mb-2" />
              <p className="font-medium">{a.doctor}</p>
              <p className="text-sm text-gray-500">{a.specialty}</p>
              <p className="mt-2 text-right text-sm">{a.time}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
