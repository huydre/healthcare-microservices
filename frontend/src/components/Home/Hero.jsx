// src/components/Hero.jsx
import React from 'react'
import doctorImg from '../../assets/doctor.jpg'
import avatar1 from '../../assets/avatar1.jpg'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 min-h-screen flex items-center">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-100/40 to-blue-100/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* LEFT */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                🏥 Nền tảng chăm sóc sức khỏe hàng đầu
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Chăm sóc
                </span>
                <br />
                <span className="text-gray-900">sức khỏe</span>
                <br />
                <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                  thông minh
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Hệ thống chăm sóc sức khỏe toàn diện với công nghệ AI, giúp bạn quản lý sức khỏe một cách hiệu quả và tiện lợi.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/get-started" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <span className="relative z-10">Bắt đầu ngay</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a href="/book" className="px-8 py-4 bg-white text-gray-700 rounded-2xl font-semibold border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 shadow-lg">
                Đặt lịch tư vấn
              </a>
            </div>

            {/* Stats & social proof */}
            <div className="flex items-center space-x-6 pt-8">
              <div className="flex -space-x-3">
                {[avatar1,avatar1,avatar1,avatar1].map((src,i) => (
                  <img key={i} src={src}
                       className="w-12 h-12 rounded-full border-3 border-white shadow-lg" />
                ))}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">5,000+ <span className="text-lg font-normal text-gray-600">bệnh nhân tin tưởng</span></p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2 text-sm">4.9/5 đánh giá</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative">
              <img src={doctorImg} alt="Doctor" className="w-full rounded-3xl shadow-2xl" />
              
              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl backdrop-blur-sm bg-white/90">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Hỗ trợ 24/7</p>
                    <p className="text-sm text-gray-600">Luôn sẵn sàng phục vụ</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl backdrop-blur-sm bg-white/90">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">AI Thông minh</p>
                    <p className="text-sm text-gray-600">Chẩn đoán chính xác</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
