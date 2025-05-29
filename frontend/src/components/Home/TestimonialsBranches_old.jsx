import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

// Ví dụ data testimonials
const testimonials = [
  {
    title: "NEW VISIT BY MEDICAL CENTER",
    text: "The cosmetician isn't just about enhancing beauty, but crafting confidence.",
    avatar: "/src/assets/avatar1.jpg",
    name: "Jenna Milton",
    subtitle: "Visit Cosmetician"
  },
  {
    title: "MEDICAL CENTER PATIENT",
    text: "In the realm of care, my doctor here isn't just a practitioner; they're a guardian of health.",
    rating: 4.2,
    avatar: "/src/assets/branch1.avif",
    name: "Maria Reed",
    subtitle: "Visit Female Doctor – Dr. Nillo Miliana"
  },
  {
    title: "BRUNCH O47",
    text: "Trust isn't given; it's earned. And my surgeon here didn't just earn my trust, but my admiration.",
    avatar: "/src/assets/branch2.jpeg",
    name: "Michiko Miller",
    subtitle: "Surgeon Clinic"
  },
  {
    title: "DENTIST VISIT",
    text: "My dental clinic isn't just about fixing smiles; it's about creating them.",
    avatar: "/src/assets/branch3.jpg",
    name: "Sharon Roberts",
    subtitle: "Dental Clinic"
  },
  // … bạn có thể thêm hàng chục item ở đây
]

// Ví dụ data branches
const branches = [
  "/src/assets/branch1.avif",
  "/src/assets/branch2.jpeg",
  "/src/assets/branch3.jpg",
  "/src/assets/branch4.jpg",
  "/src/assets/branch5.jpg",
  "/src/assets/branch6.jpg",
]

export default function TestimonialsBranches() {
  const [swiperIdx, setSwiperIdx] = useState(0)

  return (
    <section className="px-8 py-16 space-y-12 bg-white">
      {/* --- TESTIMONIALS CAROUSEL --- */}
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          navigation={{
            prevEl: '.btn-prev',
            nextEl: '.btn-next'
          }}
          onSlideChange={(sw) => setSwiperIdx(sw.realIndex)}
        >
          {/** Chia mỗi slide chứa 4 cards */}
          {Array.from({length: Math.ceil(testimonials.length/4)}, (_, page) => (
            <SwiperSlide key={page}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {testimonials.slice(page*4, page*4+4).map((t,i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-2xl relative">
                    <h6 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      {t.title}
                    </h6>
                    <p className="text-sm text-gray-800 mb-4">{t.text}</p>
                    {/* Rating nếu có */}
                    {t.rating && (
                      <div className="flex items-center mb-4">
                        {/* 5 sao tĩnh */}
                        <div className="flex text-yellow-400 mr-2">
                          {Array(5).fill(0).map((_,i)=>(
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <polygon points="9.9, 1.1, 12.6, 6.8, 18.8, 7.3, 13.8, 11.4, 15.1, 17.6, 9.9, 14.2, 4.7, 17.6, 6, 11.4, 1, 7.3, 7.2, 6.8"/>
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{t.rating}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-3">
                      <img src={t.avatar} alt="" className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-gray-500">{t.subtitle}</p>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 text-4xl text-gray-300">“</div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev/Next buttons + counter */}
        <button className="btn-prev absolute left-0 top-1/2 -translate-y-1/2 text-2xl p-2">‹</button>
        <button className="btn-next absolute right-0 top-1/2 -translate-y-1/2 text-2xl p-2">›</button>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm">
          {swiperIdx+1}/{Math.ceil(testimonials.length/4)}
        </div>
      </div>

      {/* --- BRANCHES GALLERY --- */}
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-bold">
          Plus <span className="text-green-600">250</span> medical branch<br/>
          all over the country!
        </h2>

        <div className="flex justify-center items-center flex-wrap gap-6 mt-6">
          {branches.map((src,i) => (
            <div
              key={i}
              className={`rounded-full overflow-hidden shadow-lg
                ${i===2?'w-80 h-80': 'w-40 h-40'}
                ${i===5?'w-96 h-96':''} 
                flex-shrink-0`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
              {/* Ví dụ thêm nút play nếu là video */}
              {i===2 && (
                <div className="absolute inset-0 flex justify-center items-center">
                  <button className="w-12 h-12 bg-white rounded-full shadow-md">
                    ▶
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* View all */}
          <div className="w-40 h-40 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
            <button className="text-sm font-medium text-gray-600">
              + View All<br/>Services
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
