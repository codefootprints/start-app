import { useEffect, useState } from "react";
import "./App.css"

function App() {
  // State untuk aset
  const [resources, setResources] = useState([])
  const [resourceFormData, setResourceFormData] = useState({
    name: '',
    category: '',
  })

  // State untuk user
  const [users, setUsers] = useState([])
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
  })

  // State untuk notifikasi
  const [notification, setNotification] = useState({
    message: '',
    type: '',
  })

  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => (
      setNotification({ message: '', type: ''})
    ), 3000);
  }

  const [assignment, setAssignment] = useState({
    user_id: '',
    resource_id: '',
    title: '',
  })

  // Mengambil data dari backend Golang
  const fetchUsers = () => {
    fetch("http://localhost:3000/api/users")
    .then(res => res.json())
    .then(data => setUsers(data))
    .catch(err => console.error("Gagal mengambil data", err))
  }

  const fetchResources = () => {
    fetch("http://localhost:3000/api/resources")
    .then(res => res.json())
    .then(data => setResources(data))
    .catch(err => console.error("Gagal mengambil data", err))
  }

  const handleUserSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFormData)
    })
    .then(res => res.json())
    .then(() => {
      // Reset form
      setUserFormData({
        username: '',
        email: '',
      })
      fetchUsers()
      showNotification("User berhasil ditambahkan!")
    })
    .catch(err => {
      console.error("Gagal menambah user:", err)
      showNotification("Gagal menambah user", "error")
    })
  }

  const handleResourceSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/api/resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resourceFormData),
    })
    .then(res => res.json())
    .then(() => {
      // Reset form
      setResourceFormData({
        name: '',
        category: '',
      })
      // Refresh list tabel
      fetchResources()
      showNotification("Aset berhasil ditambahkan!")
    })
    .catch(err => {
      console.error("Gagal menambah aset:", err)
      showNotification("Gagal menambah aset", "error")
    })
  }

  const handleResourceDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus aset ini?")) {
      fetch(`http://localhost:3000/api/resources/${id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(() => {
        fetchResources()
      })
      .catch(err => console.error("Gagal menghapus aset:", err))
    }
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
      console.error("Gagal menambah task:", data.error)
      } else {
        fetchResources()
        setAssignment({
          user_id: '',
          resource_id: '',
          title: '',
        })
        showNotification("Gagal menambah task", "error")
      }
    })
  }

  useEffect(() => {
    fetchResources()
    fetchUsers()
  }, [])

  return (
    <>
      {notification.message && (
        <div className={`fixed top-5 right-5 px-6 py-3 rounded-lg shadow-lg border transition-all duration-500 ${
          notification.type === "success"
          ? "bg-white border-olive-500 text-olive-500"
          : "bg-red-50 border-red-500 text-red-600"
        } z-50`}>
          <p className="font-medium text-sm">{notification.message}</p>
        </div>
      )}

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

          {/* Form Tambah User */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-stone-200 mb-8">
            <h2 className="text-lg font-semibold text-stone-700 mb-4">Registrasi Anggota Tim</h2>
            <form onSubmit={handleUserSubmit} className="flex gap-4">
              <input
                type="text"
                placeholder="Username"
                className="flex-1 p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-olive-500"
                value={userFormData.username}
                onChange={(e) => setUserFormData({
                  ...userFormData,
                  username: e.target.value
                })}
                required
                />
              <input
                type="email"
                placeholder="Email"
                className="flex-1 p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-olive-500"
                value={userFormData.email}
                onChange={(e) => setUserFormData({
                  ...userFormData,
                  email: e.target.value
                })}
                required
              />
              <button type="submit" className="px-6 py-2 bg-olive-800 text-white rounded hover:bg-olive-500 font-medium">
                Tambah User
              </button>
            </form>
          </div>

          {/* Form Tambah Aset */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 mb-8">
            <h2 className="text-lg font-semibold text-stone-700 mb-4">
              Tambah Aset Baru
            </h2>
            <form onSubmit={handleResourceSubmit} className="flex gap-4">
              <input 
                type="text"
                placeholder="Nama Aset (Contoh: Macbook Air)"
                className="flex-1 p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-olive-500"
                value={resourceFormData.name}
                onChange={(e) => setResourceFormData({...resourceFormData, name: e.target.value})}
                required
              />
              <input 
                type="text"
                placeholder="Kategori"
                className="flex-1 p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-olive-500"
                value={resourceFormData.category}
                onChange={(e) => setResourceFormData({...resourceFormData, category: e.target.value})}
                required
              />
              <button type="submit" className="px-6 py-2 bg-olive-800 text-white rounded hover:bg-olive-500 font-medium">
                Tambah Aset
              </button>
            </form>
          </div>

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

          {/* Tabel Resource */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-stone-100 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-stone-600">Nama Aset</th>
                  <th className="px-6 py-4 text-sm font-semibold text-stone-600">Kategori</th>
                  <th className="px-6 py-4 text-sm font-semibold text-stone-600">Status</th>
                  <th className="px-6 text-sm font-semibold text-stone-600 text-center">Aksi</th>
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
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleResourceDelete(item.id)}
                        className="text-red-600 hover:text-white hover:bg-red-600 font-medium text-sm rounded px-2 py-1 hover:cursor-pointer"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
