import { useEffect, useState } from "react";
import "./App.css"

function App() {
  const [resources, setResources] = useState([])

  // State untuk form
  const [formData, setFormData] = useState({
    name: '',
    category: '',
  })

  const [users, setUsers] = useState([])
  const [assignment, setAssignment] = useState({
    user_id: '',
    resource_id: '',
    title: '',
  })

  // Mengambil data dari backend Golang
  const fetchResources = () => {
    fetch("http://localhost:3000/api/resources")
    .then(res => res.json())
    .then(data => setResources(data))
    .catch(err => console.error("Gagal mengambil data", err))
  }

  const fetchUsers = () => {
    fetch("http://localhost:3000/api/users")
    .then(res => res.json())
    .then(data => setUsers(data))
  }

  useEffect(() => {
    fetchResources()
    fetchUsers()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/api/resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(() => {
      // Reset form
      setFormData({
        name: '',
        category: '',
      })
      // Refresh list tabel
      fetchResources()
    })
    .catch(err => console.error("Gagal menambah aset:", err))
  }

  const handleAssign = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: parseInt(assignment.user_id),
        resource_id: parseInt(assignment.resource_id),
        title: assignment.title,
        description: "Penugasan otomatis dari dashboard",
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        fetchResources()
        setAssignment({
          user_id: '',
          resource_id: '',
          title: '',
        })
      }
    })
  }

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800">
            START Dashboard
          </h1>
          <div className="px-4 py-1 bg-olive-100 text-olive-800 rounded-full text-sm font-medium border border-olive-800">
            {resources.length} Resource Terdata
          </div>
        </header>

        {/* Form Assignment */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 mb-8">
          <h2 className="text-lg font-semibold text-stone-700 mb-4">
            Assign Resource
          </h2>
          <form onSubmit={handleAssign} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Judul Tugas"
              className="p-2 border border-stone-300 rounded"
              value={assignment.title}
              onChange={e => setAssignment({
                ...assignment,
                title: e.target.value
              })}
              required
            />
            <select
              className="p-2 border border-stone-300 rounded"
              value={assignment.user_id}
              onChange={e => setAssignment({
                ...assignment,
                user_id: e.target.value
              })}
              required
            >
              <option value="">Pilih User</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.username}</option>
              ))}
            </select>
            <select
              className="p-2 border border-stone-300 rounded"
              value={assignment.resource_id}
              onChange={e => setAssignment({
                ...assignment,
                resource_id: e.target.value
              })}
              required
            >
              <option value="">Pilih Aset</option>
              {resources.filter(r => r.status === "available")
              .map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
            <button type="submit" className="px-6 py-2 bg-olive-800 text-white rounded hover:bg-olive-500 font-medium">
              Assign
            </button>
          </form>
        </div>

        {/* Form Tambah Aset */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 mb-8">
          <h2 className="text-lg font-semibold text-stone-700 mb-4">
            Tambah Aset Baru
          </h2>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input 
              type="text"
              placeholder="Nama Aset (Contoh: Macbook Air)"
              className="flex-1 p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-olive-500"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input 
              type="text"
              placeholder="Kategori"
              className="flex-1 p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-olive-500"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            />
            <button type="submit" className="px-6 py-2 bg-olive-800 text-white rounded hover:bg-olive-500 font-medium">
              Simpan
            </button>
          </form>
        </div>

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
