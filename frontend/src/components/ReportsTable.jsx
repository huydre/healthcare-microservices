// src/components/ReportsTable.jsx
export default function ReportsTable() {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
        {/* Tab group: Lab Reports | Prescription | ... */}
        <div className="flex space-x-2 mb-4">
          <button className="px-4 py-1 bg-black text-white rounded-full">Lab Reports</button>
          {/* Các tab khác */}
        </div>
        <table className="w-full text-sm">
          <thead className="text-left border-b">
            <tr>
              <th className="py-2">Test Name</th>
              <th>Referred by</th>
              <th>Date</th>
              <th>Comments</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Electrocardiography</td>
              <td>Dr. Rafiq…</td>
              <td>28 Jan, 2024</td>
              <td>Good! Take rest</td>
              <td><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">Normal</span></td>
            </tr>
            {/* Thêm các row khác */}
          </tbody>
        </table>
      </div>
    )
  }
  