Tentu, mari kita bermain peran. Anggap saya adalah seorang pemilik bisnis kecil yang ingin mendigitalisasi operasional saya. Karena kamu menguasai **Golang, Postgres, dan Docker**, saya akan memberikan tugas yang menantang sisi backend sekaligus membutuhkan tampilan frontend yang fungsional.

Berikut adalah *project brief* dari saya:

---

## **Project Title: "Simple Task & Resource Tracker (START)"**

### **1. Masalah (Problem Statement)**
Saya memiliki tim kecil beranggotakan 5 orang. Saat ini, kami kesulitan melacak siapa mengerjakan apa dan alat (resource) apa yang sedang dipakai (misalnya: akun server, lisensi software, atau perangkat tes). Kami butuh aplikasi internal sederhana untuk mendata tugas dan memantau ketersediaan barang tersebut.

### **2. Kebutuhan Fitur (Requirements)**

**Backend (Kekuatan Utama Kamu):**
*   **Resource Management:** CRUD (Create, Read, Update, Delete) untuk mendata barang (Nama barang, Kategori, Status: Tersedia/Dipakai).
*   **Task Assignment:** Fitur untuk mencatat tugas dan menghubungkannya dengan pengguna serta barang yang digunakan.
*   **Database:** Gunakan **Postgres** untuk menyimpan data relasional antara *User*, *Task*, dan *Resource*.
*   **API:** Bangun RESTful API menggunakan **Golang**.

**Frontend (Wajah Aplikasi):**
*   **Dashboard Sederhana:** Menampilkan tabel daftar tugas yang sedang berjalan dan status ketersediaan barang.
*   **Form Input:** Halaman sederhana untuk menambah tugas baru dan memilih barang dari *dropdown*.
*   **Styling:** Gunakan CSS framework (seperti Tailwind) agar terlihat bersih dan profesional (tidak perlu desain yang terlalu artistik, yang penting fungsional).

**Deployment (Standar Profesional):**
*   Gunakan **Docker Compose** agar saya bisa menjalankan aplikasi ini di server saya hanya dengan perintah `docker-compose up`.

---

### **3. Kriteria Keberhasilan (Acceptance Criteria)**
1.  Saya bisa melihat daftar barang dan tahu mana yang sedang "Dipakai" dan siapa yang memakainya.
2.  Aplikasi tidak kehilangan data saat container Docker dimatikan (artinya kamu berhasil melakukan *volume mapping* pada Postgres).
3.  Performa cepat karena menggunakan Golang di sisi server.

---

### **4. Kenapa Use Case Ini Bagus Untukmu?**
*   **Membuktikan Skill Database:** Kamu akan belajar tentang *Foreign Keys* dan relasi antar tabel (User ke Task, Resource ke Task).
*   **Portfolio-Ready:** Ini bukan sekadar "To-Do List" biasa. Ini adalah "Internal Tool" yang punya nilai nyata bagi bisnis.
*   **Fullstack Bridge:** Kamu akan belajar bagaimana menghubungkan logika backend yang kuat dengan interface yang memudahkan orang awam.

---

### **Tantangan Pertama untuk Kamu:**
Sebagai langkah awal, bisakah kamu merancang **struktur tabel database** (skema) untuk aplikasi ini? Tabel apa saja yang kamu perlukan agar data *User*, *Task*, dan *Resource* saling terhubung dengan benar?