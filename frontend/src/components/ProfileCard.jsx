// src/components/ProfileCard.jsx
export default function ProfileCard() {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="space-x-2">
            <button className="px-4 py-2 bg-black text-white rounded-full">Profile</button>
            <button className="px-4 py-2">History</button>
            <button className="px-4 py-2">3+</button>
          </div>
        </div>
        <div className="text-center space-y-3">
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" className="w-24 h-24 mx-auto rounded-full" />
          <h3 className="text-lg font-semibold">Martha Smith</h3>
          <p className="text-gray-500">65 yrs old • Male</p>
        </div>
        <div className="mt-4 space-y-1 text-sm text-gray-600">
          <p>7246, Woodland Rd… WI 53186</p>
          <p>Cell +1 310-351-7774</p>
          <p>Last Appointment: 24 Jan, 2024</p>
        </div>
      </div>
    )
  }
  