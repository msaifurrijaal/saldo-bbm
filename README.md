
# Fuel Management 🚚
Fuel Management merupakan website untuk melakukan manejemen saldo BBM.

## Instalasi Lokal 🖥️
Untuk menjalankan Fuel Management pada mesin lokal, ikuti langkah-langkah berikut: 

1. Clone repository Buahkita dari Github

~~~bash  
  https://github.com/msaifurrijaal/saldo-bbm.git
~~~

2. Masuk ke directory Buahkita

~~~bash  
  cd saldo-bbm
~~~

3. Install package dengan npm

~~~bash  
  npm install
~~~

4. Lakukan konfigurasi .env

~~~bash  
  DATABASE_URL="isi_url_database_anda"
  SECRET_TOKEN="isi_secret_token_anda"
~~~

5. Jalankan proses migrasi database

~~~bash  
  npx prisma migrate dev --name nama-migrasi
~~~

6. Jalankan TypeScript Compiler untuk merubah script data dummy typescript menjadi file javascript

~~~bash  
  npx tsc src/dummyData.ts
~~~

7. Jalankan script node js untuk menjalankan proses generate data dummy

~~~bash  
  node src/dummyData.js
~~~

8. Jalankan aplikasi

~~~bash  
  npm run dev
~~~

9. Buka browser dan akses http://localhost:5173 untuk melihat aplikasi Buahkita.

## Fitur 📝
Beberapa fitur yang tersedia dalam aplikasi Fuel Management adalah:

- Login dan Register.
- Pencarian driver, aktivitas, request, dan mobil.
- Informasi mengenai detail data.
- Melakukan proses penambahkan aktivitas (driver), dan proses persetujuan aktivitas (admin) .
- Melakukan proses penambahkan request pengisian bbm (driver), dan proses persetujuan request pengisian bbm (admin).
- List history aktivitas dan request.
- Dan beberapa fitur lain

