# START - Simple Task & Asset Resource Tracker

**START** adalah aplikasi *full-stack* modern yang dirancang untuk mengelola inventaris aset (resource) dan penugasan (task) kepada pengguna secara efisien. Proyek ini dibangun dengan fokus pada integritas data, keamanan, dan efisiensi *deployment* menggunakan Docker.

## 🚀 Fitur Utama

* **Manajemen Aset & User**: CRUD lengkap untuk aset dan pengguna.
* **Sistem Peminjaman Terintegrasi**: Alur penugasan aset ke user dengan validasi status otomatis (`available` / `in_use`).
* **Integritas Data Tinggi**:
* Pencegahan penghapusan aset yang sedang digunakan.
* Validasi input API di sisi Backend.
* Transaksi database untuk menjamin konsistensi data.


* **Riwayat Pengembalian**: Pelacakan aset yang sudah dikembalikan menggunakan fitur *Soft Delete* GORM.
* **UI Modern**: Antarmuka berbasis React dengan sistem *Accordion*, notifikasi *toast* kustom, dan skema warna *Olive-Stone*.
* **Production Ready**: Konfigurasi Docker menggunakan *Multi-Stage Builds* untuk ukuran *image* yang minimalis.

## 🛠️ Stack Teknologi

* **Backend**: [Go](https://go.dev/) (Fiber Framework, GORM)
* **Frontend**: [React](https://react.dev/) (Vite, Tailwind CSS v4)
* **Database**: [PostgreSQL](https://www.postgresql.org/)
* **DevOps**: [Docker](https://www.docker.com/) & Docker Compose

## 📦 Persiapan & Instalasi

### 1. Prasyarat

* Docker & Docker Compose terinstal di mesin Anda.

### 2. Konfigurasi Environment

Buat file `.env` di folder root project dan sesuaikan kredensialnya:

```env
DB_HOST=db
DB_USER=user_admin
DB_PASSWORD=password_rahasia
DB_NAME=start_db
DB_PORT=5432
```

### 3. Menjalankan Aplikasi

Gunakan Docker Compose untuk membangun dan menjalankan seluruh layanan (DB, Backend, Frontend):

```bash
docker-compose up --build
```

Aplikasi dapat diakses melalui:

* **Frontend**: `http://localhost:5173`
* **Backend API**: `http://localhost:3000`

## 🏗️ Arsitektur Docker (Multi-Stage Build)

Proyek ini menggunakan optimasi *Multi-Stage Build* untuk memastikan efisiensi di lingkungan produksi:

* **Backend**: Menggunakan stage `builder` (Golang Alpine) dan stage `final` (Alpine minimalis) untuk menjaga ukuran *binary* tetap kecil.
* **Frontend**: Menggunakan stage `build` (Node.js) dan stage `production` (Nginx) untuk performa penyajian file statis yang maksimal.

## 📝 Catatan Pengembangan

* **Validasi**: Backend secara ketat menolak input kosong dan memberikan pesan error yang deskriptif.
* **Keamanan**: Kredensial database tidak lagi di-*hardcode* di dalam kode sumber melainkan ditarik dari variabel lingkungan.
* **Audit**: Semua task yang "selesai" tetap tersimpan di database dengan flag `deleted_at`, memungkinkan fitur riwayat untuk tetap dapat melihat data historis.
