import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Testimonials data - updated content for Vietnamese healthcare context
const testimonials = [
  {
    title: "KHÁM BỆNH TẠI PHÒNG KHÁM",
    text: "Hệ thống đặt lịch trực tuyến rất tiện lợi, giúp tôi tiết kiệm thời gian và không phải chờ đợi lâu.",
    avatar: "/src/assets/avatar1.jpg",
    name: "Nguyễn Thị Lan",
    subtitle: "Bệnh nhân thân thiết",
    rating: 5.0
  },
  {
    title: "TƯ VẤN TRỰC TUYẾN",
    text: "Chatbot AI rất thông minh, có thể tư vấn sơ bộ và hướng dẫn tôi đến đúng chuyên khoa cần thiết.",
    rating: 4.8,
    avatar: "/src/assets/branch1.avif",
    name: "Trần Văn Minh",
    subtitle: "Tư vấn tim mạch"
  },
  {
    title: "DỊCH VỤ CHUYÊN KHOA",
    text: "Dịch vụ chuyên nghiệp, bác sĩ tận tâm. Hệ thống quản lý hồ sơ điện tử rất tiện lợi.",
    avatar: "/src/assets/branch2.jpeg",
    name: "Lê Thị Mai",
    subtitle: "Khoa Da liễu",
    rating: 4.9
  },
  {
    title: "RĂNG HÀM MẶT",
    text: "Công nghệ hiện đại, quy trình khám chữa bệnh chuyên nghiệp. Tôi rất hài lòng với dịch vụ.",
    avatar: "/src/assets/branch3.jpg",
    name: "Phạm Thanh Hương",
    subtitle: "Nha khoa",
    rating: 4.7
  },
]

// Healthcare service categories
const serviceCategories = [
  {
    name: "Tim mạch",
    icon: "❤️",
    color: "from-red-400 to-pink-500"
  },
  {
    name: "Da liễu", 
    icon: "🧴",
    color: "from-green-400 to-emerald-500"
  },
  {
    name: "Nhi khoa",
    icon: "👶",
    color: "from-blue-400 to-cyan-500"
  },
  {
    name: "Thần kinh",
    icon: "🧠",
    color: "from-purple-400 to-indigo-500"
  },
  {
    name: "Nha khoa",
    icon: "🦷",
    color: "from-yellow-400 to-orange-500"
  },
  {
    name: "Mắt",
    icon: "👁️",
    color: "from-teal-400 to-blue-500"
  }
]

export default function TestimonialsBranches() {
  const [activeTab, setActiveTab] = useState('testimonials')

  const StarRating = ({ rating }) => {
    const stars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    return (
      <div className="flex items-center space-x-1">
        {[...Array(stars)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0v15z"/>
          </svg>
        )}
        <span className="text-gray-600 text-sm ml-2">{rating}/5</span>
      </div>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
            💚 Trải nghiệm khách hàng
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Được tin tưởng bởi{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              hàng nghìn
            </span>{" "}
            bệnh nhân
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá những câu chuyện thành công và trải nghiệm tuyệt vời từ các bệnh nhân đã sử dụng dịch vụ của chúng tôi.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'testimonials'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Đánh giá khách hàng
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'services'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dịch vụ chuyên khoa
            </button>
          </div>
        </div>

        {/* Testimonials Section */}
        {activeTab === 'testimonials' && (
          <div className="max-w-6xl mx-auto">
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="pb-12"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-center space-x-4 mb-6">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover shadow-md"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                          <p className="text-blue-600 text-sm font-medium">{testimonial.subtitle}</p>
                          {testimonial.rating && <StarRating rating={testimonial.rating} />}
                        </div>
                      </div>
                      
                      {/* Badge */}
                      <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium mb-4 self-start">
                        {testimonial.title}
                      </div>
                      
                      {/* Testimonial Text */}
                      <blockquote className="text-gray-700 leading-relaxed flex-grow mb-6 text-lg">
                        "{testimonial.text}"
                      </blockquote>
                      
                      {/* Quote icon */}
                      <div className="flex justify-end">
                        <svg className="w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <button className="swiper-button-prev-custom w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="swiper-button-next-custom w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Services Section */}
        {activeTab === 'services' && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {serviceCategories.map((service, index) => (
                <div 
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  
                  {/* Icon */}
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  
                  {/* Service name */}
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-800">
                    {service.name}
                  </h3>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300"></div>
                </div>
              ))}
            </div>
            
            {/* Call to action */}
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Xem tất cả dịch vụ
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
