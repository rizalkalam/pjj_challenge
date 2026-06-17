## Struktur Folder

- `src/`: Folder utama kode sumber.
  - `assets/`: Aset statis proyek.
    - `icons/`: Ikon-ikon fungsional (SVG).
    - `images/`: Gambar konten dan foto (PNG/JPG).
    - `graphics/`: Elemen dekoratif, background, dan aksen visual (SVG).
  - `css/`: File stylesheet.
    - `modules/`: File CSS terpisah per bagian website.
    - `style.css`: File utama yang menggabungkan semua modul.
  - `index.html`: File HTML utama.
- `docs/`: Dokumentasi tambahan proyek.

## Cara Pengembangan

Untuk menambahkan gaya baru, disarankan untuk menambahkannya pada file modul yang relevan di `src/css/modules/` agar tetap rapi.

## Persiapan Migrasi Framework

Struktur ini sudah mengikuti standar industri. Jika ingin pindah ke React/Next.js:
1. Pindahkan folder `assets` ke folder `public`.
2. Gunakan modular CSS yang ada untuk komponen-komponen React.
3. Potong `index.html` menjadi komponen-komponen JSX.