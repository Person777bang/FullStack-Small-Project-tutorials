# FullStack Small Project Tutorials

Aplikasi CRUD full-stack untuk mengelola data pengguna, produk, kategori, dan alamat pengiriman, dilengkapi autentikasi JWT dan kontrol akses berbasis peran (admin/user).

## Tech Stack

**Backend**
- Node.js + Express
- Sequelize (ORM)
- MySQL / TiDB Cloud (production)
- JWT (jsonwebtoken) untuk autentikasi
- bcrypt untuk hashing password
- express-validator untuk validasi input

**Frontend**
- React (Create React App)
- React Router DOM
- Axios
- Bulma CSS

**Deployment**
- Vercel (backend & frontend)
- TiDB Cloud (database production)

## Fitur

- **Autentikasi**: register, login, JWT dengan expiry
- **Role-based access control**: admin dan user biasa
  - Semua user yang login boleh melihat (GET) data produk, kategori, dan pengguna
  - Hanya admin yang boleh menambah, mengubah, dan menghapus data
- **Manajemen Pengguna**: CRUD lengkap, pencarian berdasarkan nama/email, pagination
- **Manajemen Produk**: CRUD lengkap dengan kategori, pencarian, pagination
- **Manajemen Alamat**: setiap user bisa menyimpan beberapa alamat dan memilih satu sebagai alamat utama
- **Pencarian & pagination**: dilakukan di sisi backend (query database), bukan di frontend
- **Validasi input**: menggunakan express-validator di setiap endpoint yang menerima data

## Struktur Folder

```
FULL STACK/
├── Backend/
│   ├── Controller/       # Logic bisnis (query database, proses request)
│   ├── model/            # Definisi tabel Sequelize
│   ├── routes/           # Definisi endpoint API
│   ├── middleware/       # verifyToken, verifyAdmin, validasi input
│   ├── config/           # Konfigurasi koneksi database
│   └── index.js          # Entry point server
└── frontend/
    └── src/
        ├── pages/         # Halaman (UserList, ProductList, AddressList, dll)
        ├── components/    # Komponen atomic design (atoms, molecules, organisms, templates)
        └── service/       # Fungsi pemanggilan API (axios)
```

## Model Data

| Model | Deskripsi |
|---|---|
| `Account` | Kredensial login (email, password hash, role: admin/user) |
| `User` | Data pengguna (nama, email, umur, gender) |
| `Product` | Produk (nama, harga, stok, kategori) |
| `ProductCategory` | Kategori produk |
| `Address` | Alamat pengiriman milik user (one-to-many, dengan status alamat utama) |

## Instalasi & Menjalankan Secara Lokal

### 1. Clone repository

```bash
git clone https://github.com/Person777bang/FullStack-Small-Project-tutorials.git
cd FullStack-Small-Project-tutorials
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

Buat file `.env` di folder `Backend`:

```
DB_NAME=nama_database
DB_USER=root
DB_PASS=
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=isi_dengan_string_rahasia
```

Jalankan server:

```bash
nodemon start
```

Server berjalan di `http://localhost:5000`.

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Buat file `.env` di folder `frontend`:

```
REACT_APP_API_URL=http://localhost:5000
```

Jalankan aplikasi:

```bash
npm start
```

Frontend berjalan di `http://localhost:3000`.

## Membuat Akun Admin Pertama

1. Register akun biasa lewat aplikasi (`/register`)
2. Ubah role akun tersebut langsung di database:

```sql
UPDATE account SET role = 'admin' WHERE email = 'email_kamu@contoh.com';
```

3. Login ulang — token yang baru akan membawa role `admin`

## API Endpoints

### Auth
| Method | Endpoint | Akses |
|---|---|---|
| POST | `/register` | Publik |
| POST | `/login` | Publik |
| POST | `/register-admin` | Admin |

### Users
| Method | Endpoint | Akses |
|---|---|---|
| GET | `/users` | Semua yang login |
| GET | `/users/:id` | Semua yang login |
| POST | `/users` | Admin |
| PATCH | `/users/:id` | Admin |
| DELETE | `/users/:id` | Admin |

### Products
| Method | Endpoint | Akses |
|---|---|---|
| GET | `/products` | Semua yang login |
| GET | `/products/:id` | Semua yang login |
| GET | `/categories` | Semua yang login |
| POST | `/products` | Admin |
| DELETE | `/products/:id` | Admin |

### Addresses
| Method | Endpoint | Akses |
|---|---|---|
| GET | `/addresses` | Pemilik alamat |
| POST | `/addresses` | Pemilik alamat |
| PATCH | `/addresses/:id` | Pemilik alamat |
| PATCH | `/addresses/:id/primary` | Pemilik alamat |
| DELETE | `/addresses/:id` | Pemilik alamat |

Endpoint GET (produk, kategori, pengguna) mendukung query parameter:
- `search_query` — kata kunci pencarian
- `page` — nomor halaman
- `limit` — jumlah data per halaman

Contoh: `/users?search_query=budi&page=1&limit=10`

## Deployment

Backend dan frontend di-deploy terpisah ke Vercel. Environment variable (`DB_*`, `JWT_SECRET`, `REACT_APP_API_URL`) harus diisi di dashboard Vercel masing-masing project, karena file `.env` tidak ikut ter-deploy.

Database production menggunakan TiDB Cloud (kompatibel MySQL, wajib koneksi SSL).

## Lisensi

Proyek ini dibuat untuk keperluan pembelajaran.
