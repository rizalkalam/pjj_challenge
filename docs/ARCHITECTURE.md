# Architecture Documentation - PJJ Challenge

## Overview
Proyek ini menggunakan pendekatan **Modular Static Architecture**. Tujuannya adalah untuk memisahkan logika (JS), gaya (CSS), dan struktur (HTML) sehingga mudah untuk dikelola dan siap dimigrasikan ke framework modern.

## Folder Structure
- `/src`: Berisi kode sumber aplikasi.
  - `/assets`: Aset statis (icons, images, graphics).
  - `/css`: Stylesheet modular.
  - `/js`: Logika aplikasi eksternal.
- `/docs`: Dokumentasi teknis proyek.

## CSS Modularization
Kami membagi CSS menjadi beberapa modul berdasarkan section:
1. `variables.css`: Centralized theme (Colors, Fonts).
2. `base.css`: Reset and global styles.
3. `header.css`, `banner.css`, dsb: Styles khusus per section.

## HTML Semantics
Menggunakan tag HTML5 Semantik untuk aksesibilitas dan SEO:
- `<header>`: Navigasi utama.
- `<main>`: Konten utama website.
- `<section>`: Blok konten mandiri (About, Events, Timeline, FAQ).
- `<footer>`: Informasi kontak dan media sosial.

## JavaScript Best Practices
- Menggunakan `DOMContentLoaded` untuk inisialisasi.
- Fungsi didefinisikan secara global melalui `window` agar bisa dipanggil dari HTML `onclick`.
- Pemisahan tanggung jawab fungsi (Carousel, FAQ).