# START (Simple Task & Resource Tracker)

**START** adalah aplikasi Fullstack yang dirancang untuk membantu tim kecil dalam mengelola aset perusahaan (seperti laptop, akun server, atau lisensi software) dan melacak penugasan aset tersebut kepada anggota tim secara real-time.

Aplikasi ini dibangun dengan fokus pada performa tinggi, integritas data, dan kemudahan deployment menggunakan Docker.

## 🚀 Tech Stack

* **Backend:** [Golang](https://go.dev/) dengan framework [Fiber](https://gofiber.io/)
* **Database:** [PostgreSQL](https://www.postgresql.org/) dengan [GORM](https://gorm.io/) (ORM)
* **Frontend:** [React.js](https://react.dev/) (Vite) dengan [Tailwind CSS v4](https://tailwindcss.com/)
* **Infrastructure:** [Docker](https://www.docker.com/) & Docker Compose

## ✨ Key Features

* **Resource Management:** Inventarisasi aset kantor dengan status ketersediaan otomatis.
* **User Management:** Pendataan anggota tim yang bertanggung jawab.
* **Smart Assignment:** Logika transaksi backend untuk menugaskan aset ke user (otomatis mengubah status aset menjadi `in_use`).
* **Atomic Transactions:** Menjamin konsistensi data antara tabel Task dan Resource menggunakan database transaction.
* **Modern UI:** Antarmuka responsif dengan skema warna *Earth Tone* yang bersih.

## 🛠️ Cara Menjalankan Project

Pastikan Anda sudah menginstal **Docker** dan **Docker Compose** di mesin Anda.

1. Clone repositori ini:
```bash
git clone https://github.com/codefootprints/start-app.git
cd start-app
```


2. Jalankan seluruh layanan (Backend, Frontend, & Database) dengan satu perintah:
```bash
docker-compose up --build
```


3. Akses aplikasi:
* **Frontend:** [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)
* **Backend API:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)



## 📡 API Endpoints

### Resources

* `GET /api/resources` - Ambil semua daftar aset
* `POST /api/resources` - Tambah aset baru
* `DELETE /api/resources/:id` - Hapus aset (Soft delete)

### Users

* `GET /api/users` - Ambil daftar anggota tim
* `POST /api/users` - Tambah user baru

### Tasks

* `GET /api/tasks` - Lihat semua riwayat penugasan (Preloaded with User & Resource)
* `POST /api/tasks` - Buat penugasan baru (Logic: Mengubah status Resource menjadi `in_use`)

---

Dibuat dengan ❤️ sebagai bagian dari portofolio Fullstack Developer.

---
