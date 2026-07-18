# 🎁 Google Stitch — Website Ulang Tahun Khanza

Sebuah website ucapan selamat ulang tahun privat, interaktif, penuh animasi premium, dan responsif yang dirancang secara khusus sebagai hadiah ulang tahun ke-18 untuk **Khanza Aruna Zulvani** pada **19 Juli 2026**.

Website ini membawanya melalui perjalanan memori, galeri 100 foto, mini game trivia, isi tas interaktif, pesan-pesan acak yang lucu, amplop harapan, surat utama yang tersegel lilin, hingga kejutan spektakuler terakhir.

---

## 🛠️ Panduan Konfigurasi & Variabel Lingkungan (.env)

Untuk menjaga privasi dan keamanan website ini, data autentikasi disimpan di sisi server (Server-side Authentication) menggunakan secure HttpOnly cookies. Jangan menuliskan kata sandi langsung di kode sumber!

Buat file `.env` di root direktori (seperti `.env.example`) dan tambahkan variabel berikut:

```env
# Username utama (Default: Khanza)
PRIVATE_SITE_USERNAME="Khanza"

# Kunci rahasia untuk enkripsi session cookie (Gunakan string acak panjang)
SESSION_SECRET="ganti-dengan-kunci-enkripsi-acak-yang-panjang-dan-aman"

# FORMAT 1: Password Hash (Sangat Direkomendasikan)
# Gunakan perintah Node di bawah ini untuk menghasilkan password hash PBKDF2 yang aman!
PRIVATE_SITE_PASSWORD_HASH="pbkdf2:your_salt:100000:your_hash_here"

# FORMAT 2: Password Langsung (Opsi Alternatif Mudah)
# Jika Anda tidak mengatur PASSWORD_HASH, website akan otomatis membandingkan dengan variabel ini (atau default 'khanza18')
PRIVATE_SITE_PASSWORD="khanza18"
```

---

## 🔒 Cara Menghasilkan Password Hash Aman (PBKDF2)

Untuk keamanan tingkat maksimal, Anda dapat menyandikan password Anda ke dalam format hash PBKDF2. Jalankan perintah satu baris berikut di terminal komputer Anda:

```bash
node -e "const crypto = require('crypto'); const salt = crypto.randomBytes(16).toString('hex'); const iterations = 100000; const hash = crypto.pbkdf2Sync('MASUKKAN_PASSWORD_ANDA_DISINI', salt, iterations, 32, 'sha256').toString('hex'); console.log('pbkdf2:' + salt + ':' + iterations + ':' + hash);"
```

**Langkah-langkah:**
1. Ganti kata `'MASUKKAN_PASSWORD_ANDA_DISINI'` di atas dengan password pilihan Anda (misalnya `'menulmenul'`).
2. Jalankan perintah tersebut di terminal Anda.
3. Salin baris hasil output (berformat `pbkdf2:xxxx:100000:xxxx`) dan masukkan ke variabel `PRIVATE_SITE_PASSWORD_HASH` di pengaturan Vercel atau file `.env`.

---

## 🎵 Menambahkan Lagu "Semua Lagu Cinta" — Sal Priadi

Sesuai dengan aturan peramban modern, pemutaran lagu tidak dapat dilakukan secara otomatis (autoplay) tanpa interaksi pengguna. Website ini telah menyediakan pilihan di awal bagi Khanza untuk memulai dengan atau tanpa musik.

**Cara Memasang Lagu Asli:**
1. Siapkan file musik "Semua Lagu Cinta" oleh Sal Priadi dalam format `.mp3`.
2. Masukkan file tersebut ke dalam folder `/public/assets/` dengan nama `semua-lagu-cinta.mp3` (buat foldernya jika belum ada).
3. Jalankan build ulang. Website akan otomatis memutar file lokal tersebut. Jika file belum dimasukkan, sistem akan memutar lagu instrumental piano romantis yang indah sebagai cadangan agar pengalaman tidak terganggu.

---

## 📷 Mengganti 100 Foto Kenangan

Semua data foto dan metadata disimpan secara terpusat pada file:
`src/data/photos.ts`

**Cara Mengganti Foto:**
1. Masukkan file foto-foto Anda bersama Khanza ke folder `/public/photos/` (misalnya `001.jpg`, `002.jpg`, dst.).
2. Buka file `src/data/photos.ts`.
3. Ganti URL placeholder atau ubah strukturnya agar mengarah ke file lokal Anda:
   ```typescript
   // Contoh mengarahkan foto ke asset lokal Anda:
   src: `/photos/${String(idNum).padStart(3, '0')}.jpg`
   ```
   *Catatan: Gambar placeholder yang saat ini terpasang adalah gambar berkualitas tinggi dari Unsplash bertema pink romantis, kencan bersepeda, dan suasana estetis sehingga website langsung terlihat memukau sejak pertama kali dibuka!*

---

## 🚀 Panduan Deployment ke Vercel

Proyek full-stack Express + Vite ini siap di-deploy langsung ke Vercel:

1. Pastikan seluruh perubahan kode telah disimpan.
2. Jalankan build linter lokal untuk memastikan tidak ada kesalahan:
   ```bash
   npm run build
   ```
3. Hubungkan repositori Anda ke **Vercel Dashboard**.
4. Di bagian **Environment Variables** di Vercel, tambahkan:
   - `PRIVATE_SITE_USERNAME`
   - `PRIVATE_SITE_PASSWORD_HASH` (atau `PRIVATE_SITE_PASSWORD`)
   - `SESSION_SECRET`
5. Vercel akan otomatis membaca file konfigurasi dan menyebarkan website privat ini secara aman.

---

## 📝 Daftar Periksa (Checklist) Sebelum Website Diberikan kepada Khanza

*   [ ] Hubungkan domain kustom atau salin URL Vercel yang unik.
*   [ ] Pastikan file audio `semua-lagu-cinta.mp3` telah dimasukkan ke folder `/public/assets/`.
*   [ ] Pastikan password dan username Anda telah dikonfigurasi melalui Environment Variables.
*   [ ] Cari kelima kacamata easter egg sendiri untuk menguji kelancaran misi.
*   [ ] Tekan tombol "Cetak / Simpan PDF" di bagian Surat Utama untuk menguji visual kertas cetak.
*   [ ] Berikan tautan "Pintu Rahasia" ini ke Khanza tepat pada pukul 00:00 tanggal **19 Juli 2026**!
