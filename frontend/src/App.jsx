import "./App.css"

function App() {
  return (
    <div className="min-h-screen bg-[#f5f5dc] (flax) flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-[#556b2f] (olive)">
        <h1 className="text-2xl font-bold text-stone-800">
          START App Frontend
        </h1>
        <p className="text-stone-600 mt-2">
          Tailwind v4 siap digunakan untuk membangun dashboard.
        </p>
        <button className="mt-4 px-4 py-2 bg-[#556b2f] text-white rounded hover:bg-[#6b8e23] transition-colors">
          Cek Koneksi API
        </button>
      </div>
    </div>
  )
}

export default App
