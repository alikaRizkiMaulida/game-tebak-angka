# 🎮 Web Storage Number Guessing Game (Permainan Tebak Angka)

Sebuah aplikasi permainan tebak angka berbasis web yang interaktif, responsif, dan menggunakan fitur **Web Storage API** (`localStorage` dan `sessionStorage`) untuk mencatat statistik permainan secara real-time.

---

## 📸 Fitur Utama

- 🎯 **3 Tingkat Kesulitan (Difficulty Levels)**:
  - **Easy**: Angka 3 Digit (Digit: 1-3) | Batas Waktu 7 Detik
  - **Medium**: Angka 4 Digit (Digit: 1-4) | Batas Waktu 10 Detik
  - **Hard**: Angka 5 Digit (Digit: 1-5) | Batas Waktu 15 Detik
- ⏱️ **Countdown Timer**: Memberikan tantangan waktu saat menebak kombinasi angka.
- 💾 **Web Storage Integration**:
  - `sessionStorage`: Menyimpan sesi permainan berjalan (jawaban rahasia, jumlah tebakan salah per sesi).
  - `localStorage`: Menyimpan data permanen (total kemenangan, tebakan salah terbanyak dalam satu kali main).
- 🎉 **Visual & Audio Effects**:
  - Web Audio API bawaan untuk efek suara digital (_click_, _wrong_, _win_).
  - Animasi _shake_ jika tebakan salah.
  - Efek selebrasi konfeti (_Canvas Confetti_) & Modal Popup ketika menang.
- 📱 **Desain Modern & Responsif**: Tampilan dengan tema neon/cyberpunk yang nyaman dilihat di desktop maupun _smartphone_.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5** — Struktur halaman web & elemen semantic.
- **CSS3** — Custom styling, CSS Grid, Flexbox, Animation, `@media query` (Responsif).
- **JavaScript (Vanilla JS)** — Logika permainan, manipulasi DOM, Event Listener, Web Audio API.
- **Web Storage API** — Transaksi data di `localStorage` & `sessionStorage`.
- **Canvas Confetti API** — Library eksternal untuk animasi efek kemenangan.

---

## 📂 Struktur Proyek

```text
.
├── index.html   # Struktur utama antarmuka game
├── style.css    # Layout, warna, animasi, dan responsivitas
├── script.js    # Logika game, manajemen storage, dan audio
└── README.md    # Dokumentasi proyek
```

## 📜 Cara Bermain
Pilih Level: Tentukan tingkat kesulitan yang diinginkan (Easy, Medium, atau Hard).
Tekan Tombol "Bermain": Sistem akan mengacak kombinasi angka rahasia sesuai level dan memulai hitung mundur timer.
Tebak Angka: Klik tombol angka yang tersedia di layar untuk menyusun tebakan Anda:
Kombinasi angka tidak memiliki digit yang berulang.
Pengecekan tebakan dilakukan secara otomatis setelah panjang angka tebakan terpenuhi.

---

# Hasil:

Jika Benar: Efek selebrasi konfeti & modal popup akan muncul, serta statistik kemenangan bertambah.
Jika Salah: Layar bergetar (shake), status tebakan salah bertambah, dan Anda bisa mencoba lagi sebelum waktu habis.
Jika Waktu Habis: Permainan berakhir (Game Over) dan jawaban asli akan ditampilkan.

---

## ⚙️ Cara Menjalankan Proyek Secara Lokal
Tidak memerlukan node environment atau build tools tambahan.
Clone repositori ini:

git clone (https://github.com/alikaRizkiMaulida/game-tebak-angka.git)
Masuk ke direktori proyek:
Bash
cd game-tebak-angka
Buka file index.html:
Cukup double click file index.html, atau
Gunakan extension Live Server di VS Code untuk pengalaman pengembangan yang lebih baik.

---

# 🧹 Reset Data Storage
Untuk menghapus seluruh data statistik lokal (localStorage & sessionStorage), klik tombol "Hapus semua data" yang terdapat pada panel Local Stats, lalu refresh halaman web.

## 📄 Lisensi: Proyek ini bebas digunakan dan dimodifikasi untuk tujuan pembelajaran (Open Source).
