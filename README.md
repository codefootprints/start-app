# START - Simple Task & Asset Resource Tracker

**START** adalah aplikasi *full-stack* modern skala produksi yang dirancang untuk mengelola inventaris aset (resource) dan alur penugasan (task) kepada pengguna secara efisien dan aman. Proyek ini dibangun dengan fokus ketat pada integritas data, keamanan autentikasi, serta efisiensi kontainerisasi menggunakan Docker.

## 🚀 Fitur Utama

* **Sistem Autentikasi Keamanan (Terbaru)**:
    * Enkripsi password menggunakan algoritma **Bcrypt** (hashing satu arah aman di level database).
    * Manajemen sesi stateless menggunakan **JSON Web Token (JWT)** dengan masa berlaku 24 jam.
    * Proteksi *route* berlapis menggunakan kustom *Auth Middleware* di sisi Backend.
    * Sistem *Persistent Session* memanfaatkan browser `localStorage` dilengkapi tombol *Log Out* interaktif.
* **Fitur Pencarian Real-Time (Terbaru)**:
    * Penyaringan data aset (*Search & Filtering*) langsung di sisi *client* untuk efisiensi performa hit database.
* **Manajemen Aset & User**: Sistem CRUD lengkap untuk melacak pengguna dan sirkulasi inventaris.
* **Sistem Peminjaman Terintegrasi**: Alur penugasan aset ke user dengan validasi status otomatis (`available` / `in_use`).
* **Integritas Data Tinggi**: 
    * Pencegahan penghapusan aset yang statusnya sedang dipinjam oleh anggota tim.
    * Validasi input API ketat di sisi Backend guna menghindari celah data kosong (*null payload*).
    * Implementasi *Database Transaction* (GORM Tx) untuk menjamin konsistensi data saat pembuatan/pengembalian tugas.
* **Riwayat Pengembalian**: Pelacakan riwayat peminjaman masa lalu menggunakan fitur *Soft Delete* (`gorm.DeletedAt`).
* **UI Modern & Konsisten**: Antarmuka berbasis React dengan sistem *Accordion*, komponen selektor kustom, notifikasi *toast*, dan skema warna *Olive-Stone*.
* **Production Ready**: Konfigurasi Docker menggunakan *Multi-Stage Builds* untuk menghasilkan ukuran *image* yang minimalis dan aman.

## 🛠️ Stack Teknologi

* **Backend**: [Go](https://go.dev/) (Fiber Framework v2, GORM)
* **Frontend**: [React](https://react.dev/) (Vite, Tailwind CSS v4)
* **Database**: [PostgreSQL 15](https://www.postgresql.org/)
* **DevOps**: [Docker](https://www.docker.com/) & Docker Compose

## 📦 Persiapan & Instalasi

### 1. Prasyarat
* Docker & Docker Compose harus sudah terinstal di mesin Anda.

### 2. Konfigurasi Environment
Buat file `.env` di folder root project (sejajar dengan `main.go`) dan sesuaikan kredensialnya:

```env
DB_HOST=db
DB_USER=user_admin
DB_PASSWORD=password_rahasia
DB_NAME=start_db
DB_PORT=5432
JWT_SECRET=gunakan_kunci_rahasia_anda_disini
```

### 3. Menjalankan Aplikasi

Gunakan Docker Compose untuk membangun (*build*) kembali dan menjalankan seluruh layanan secara otomatis:

```bash
docker-compose up --build
```

Setelah container aktif, aplikasi dapat diakses melalui browser:

* **Frontend Dashboard**: `http://localhost:5173`
* **Backend API**: `http://localhost:3000`

## 🏗️ Arsitektur Docker (Multi-Stage Build)

Proyek ini menerapkan optimasi *Multi-Stage Build* untuk memastikan efisiensi tinggi di lingkungan produksi:

* **Backend**: Menggunakan stage `builder` dengan base image Golang Alpine untuk kompilasi binary, kemudian memindahkan hasilnya ke stage `final` berbasis Alpine murni. Menghasilkan ukuran image akhir yang sangat kecil (~20MB) tanpa menyisakan *source code* asli di dalam container.
* **Frontend**: Proses build aset statis React ditangani oleh Node.js, yang kemudian hasilnya di-*serve* menggunakan **Nginx** di tahap akhir untuk jaminan performa konkurensi yang tinggi.

## 📝 Alur Kerja Keamanan API

* Rute publik hanya dibatasi pada endpoint `/api/users` (Registrasi) dan `/api/users/login` (Login).
* Rute terproteksi lainnya mewajibkan pengiriman token JWT di dalam request header berupa `Authorization: Bearer <token_jwt>`.
* Jika token kedaluwarsa atau tidak valid, Backend akan merespons dengan status `401 Unauthorized` yang secara otomatis memicu fungsi penanganan di Frontend untuk mengeluarkan pengguna ke halaman login.