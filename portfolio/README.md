# Portfolio Pribadi

Web portfolio pribadi dengan **HTML + CSS + JavaScript murni**. Tanpa build tools — cukup buka `index.html` di browser.

## Cara membuka

- **Cara cepat:** klik dua kali `index.html`.
- **Rekomendasi (agar semua fitur berjalan optimal):** jalankan server lokal.

```powershell
# Di folder ini
python -m http.server 5500
# lalu buka http://localhost:5500
```

Atau gunakan ekstensi **Live Server** di VS Code.

## Struktur file

```
portfolio/
├── index.html   # Struktur halaman & konten
├── style.css    # Semua styling (dark default + light mode)
├── script.js    # Interaksi & animasi
└── README.md
```

## Bagian halaman

1. **Hero / Perkenalan** — nama, typewriter profesi, tombol CTA, statistik
2. **Tentang Saya** — deskripsi diri, fakta singkat, kartu keunggulan
3. **Keahlian** — progress bar skill & kartu teknologi
4. **Projek** — kartu projek dengan filter kategori
5. **Pengalaman & Pendidikan** — timeline riwayat
6. **Kontak** — info kontak, sosial media, form dengan validasi

## Fitur

- 🌙 Dark mode default + **light mode** (tersimpan di `localStorage`)
- 📱 **Responsif** penuh (desktop, tablet, mobile)
- ✨ Animasi reveal saat scroll, progress bar, counter angka
- ⌨️ Efek typewriter pada sub-judul
- 🗂️ Filter projek per kategori
- ✅ Validasi form kontak (siap dihubungkan ke backend)
- ♿ Menghormati `prefers-reduced-motion`

## Cara kustomisasi

### 1. Ganti identitas
Cari dan ganti teks berikut di `index.html`:
- `Nama Anda` → nama Anda
- `nama@email.com` → email Anda
- `+62 812 3456 7890` → nomor telepon Anda
- `Jakarta, Indonesia` → lokasi Anda

### 2. Ganti inisial / foto avatar
Di `index.html`, cari `<div class="avatar">`. Untuk memakai foto:

```html
<div class="avatar">
  <img src="foto.jpg" alt="Foto Nama Anda" />
</div>
```

### 3. Ganti tautan sosial media
Ganti setiap `href="#"` pada elemen `<a>` sosial media dengan URL akun Anda.

### 4. Ubah warna aksen
Edit variabel di bagian atas `style.css`:

```css
:root {
  --primary: #6366f1;   /* warna utama */
  --primary-2: #8b5cf6; /* gradien */
  --accent: #22d3ee;    /* aksen */
}
```

### 5. Ubah keahlian
Di `style.css`, skill bar pakai `data-level`; di HTML:

```html
<div class="skill">
  <div class="skill-top"><span>HTML &amp; CSS</span><span class="skill-val">95%</span></div>
  <div class="bar"><i data-level="95"></i></div>
</div>
```

### 6. Tambah projek
Duplikat blok `<article class="project-card" ...>` di `index.html`. Atribut
`data-category` menentukan kategori filter: `web`, `landing`, atau `ui`.

### 7. Menghubungkan form ke email
Saat ini form hanya mensimulasikan pengiriman. Agar pesan benar-benar terkirim,
sambungkan ke layanan seperti **Formspree**, **Web3Forms**, atau backend Anda sendiri.

Contoh (Formspree) di `section #contact`, ubah `<form>`:

```html
<form class="contact-form" id="contactForm" action="https://formspree.io/f/XXXX" method="POST">
```

Lalu di `script.js`, ganti blok simulasi `setTimeout(...)` dengan `form.submit()`
atau `fetch()` ke endpoint pilihan Anda.

## Deploy gratis

- **GitHub Pages** — push ke repo, aktifkan Pages di Settings.
- **Netlify / Vercel** — drag & drop folder ini.
