import React from 'react'
import Hero from '../components/Home/Hero'
import Solutions from '../components/Home/Solutions'
import TestimonialsBranches from '../components/Home/TestimonialsBranches'
import ChatBot from '../components/Chatbot'

// Thêm component Stats
const StatsSection = () => {
  const stats = [
    { number: '5,000+', label: 'Bệnh nhân tin tưởng' },
    { number: '50+', label: 'Bác sĩ chuyên khoa' },
    { number: '24/7', label: 'Hỗ trợ liên tục' },
    { number: '99%', label: 'Độ hài lòng khách hàng' },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Component CTA (Call to Action)
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Bắt đầu hành trình chăm sóc sức khỏe của bạn ngay hôm nay
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Tham gia cùng hàng nghìn bệnh nhân đã tin tưởng và trải nghiệm dịch vụ chăm sóc sức khỏe thông minh, hiện đại nhất.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
              Đăng ký miễn phí
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transform hover:-translate-y-1 transition-all duration-300">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Component Footer  
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              HealthCare AI
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Nền tảng chăm sóc sức khỏe thông minh, kết hợp công nghệ AI và kinh nghiệm y tế để mang lại dịch vụ tốt nhất cho bạn.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </button>
              <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Tư vấn trực tuyến</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Đặt lịch khám</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hồ sơ điện tử</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pharmacy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📞 1900-1234</li>
              <li>📧 support@healthcare.vn</li>
              <li>📍 123 Đường ABC, Quận 1, TP.HCM</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 HealthCare AI. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      <ChatBot />
      <Hero />
      <StatsSection />
      <Solutions />
      <TestimonialsBranches />
      <CTASection />
      <Footer />
    </div>
  )
}

export default HomePage
  