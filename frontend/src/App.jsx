import { useEffect, useState } from "react";
import "./App.css"

function App() {
  const [resources, setResources] = useState([])
  console.log(resources)

  useEffect(() => {
    // Mengambil data dari backend Golang
    fetch("http://localhost:3000/api/resources")
    .then(res => res.json())
    .then(data => setResources(data))
    .catch(err => console.error("Gagal mengambil data", err))
  }, [])
  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800">
            START Dashboard
          </h1>
          <div className="px-4 py-1 bg-olive-100 text-olive-900 rounded-full text-sm font-medium border border-olive-900">
            {resources.length} Resource Terdata
          </div>
        </header>

        {/* Tabel Resource */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-stone-100 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-stone-600">Nama Aset</th>
                <th className="px-6 py-4 text-sm font-semibold text-stone-600">Kategori</th>
                <th className="px-6 py-4 text-sm font-semibold text-stone-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {resources.map(item => (
                <tr className="hover:bg-stone-50 transition-colors" key={item.id}>
                  <td className="px-6 py-4 text-stone-800 font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-stone-500">{item.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
