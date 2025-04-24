// src/components/AnalyticsCard.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const sample = [
  { day: 'Sat', bpm: 135 },
  { day: 'Sun', bpm: 150 },
];

export default function AnalyticsCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold">Analytics</h4>
        <select className="border border-gray-200 rounded-full px-3 py-1">
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={sample}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="bpm" fill="#5B4FFF" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
