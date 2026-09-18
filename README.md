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
