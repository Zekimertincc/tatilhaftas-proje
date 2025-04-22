# 🧥 Thrift Store Manager

**Thrift Store Manager**, ikinci el bir kıyafet mağazasını yöneten full-stack bir projedir.  
Bir terminal uygulaması (C), bir REST API (Node.js + Express + SQLite) ve duyarlı bir frontend arayüzü (HTML/CSS/JS) içerir.  
Bu README, portfolyo sunumu ve test rehberi olarak hazırlanmıştır.

**Thrift Store Manager** est un projet full-stack pour gérer une friperie (magasin de vêtements d’occasion).  
Il comprend une application terminal (C), une API REST (Node.js + Express + SQLite) et une interface web responsive (HTML/CSS/JS).  
Ce fichier README sert de documentation et guide de test pour un portfolio.

---

## 🚀 Özellikler / Fonctionnalités

- ✅ Ürün yönetimi (listeleme, ekleme, güncelleme, silme)  
- ✅ Sipariş sistemi (sipariş oluşturma ve listeleme)  
- ✅ SQLite veritabanı (hafif ve portatif)  
- ✅ REST API (Node.js + Express)  
- ✅ Ön yüz (HTML + Bootstrap + Vanilla JS)  
- ✅ (Opsiyonel) C dili ile terminal aracı

---

## 📁 Proje Yapısı / Structure du projet

```
thrift-store-manager/
├── public/                # Frontend dosyaları / Fichiers frontend
│   ├── index.html
│   ├── script.js
│   └── style.css
├── src/                   # Backend dosyaları / Backend files
│   ├── controllers/       # İş mantığı / Logique métier
│   ├── routes/            # API endpointleri / Routes API
│   ├── db.js              # Veritabanı bağlantısı / Connexion SQLite
│   └── app.js             # Express sunucu kurulumu / Configuration serveur Express
├── .env                   # Ortam değişkenleri / Variables d'environnement
├── thrift_store_manager.db # SQLite veritabanı / base de données SQLite
└── README.md
```

---

## 🧪 Test Rehberi / Guide de test

### ✅ 1. Ürünleri Listele / Liste des produits
- `http://localhost:3000/index.html` adresini açın  
- Tüm ürünler doğru şekilde görüntülenmeli

### ✅ 2. Sipariş Oluştur / Créer une commande
- Ürün ve adet seç → siparişi gönder  
- Başarı mesajı gör → stok güncellensin

### ✅ 3. Postman ile API Testi / Tester l’API avec Postman

**GET /products**
```
GET http://localhost:3000/products
```

**POST /orders**
```
POST http://localhost:3000/orders
Content-Type: application/json
{
  "product_id": 2,
  "quantity": 1
}
```

### ✅ 4. Veritabanı Kontrolü / Contrôle de la base de données
- `thrift_store_manager.db` dosyasını DBeaver veya CLI ile aç  
- `SELECT * FROM orders ORDER BY date DESC;` sorgusunu çalıştır

### ✅ 5. Hatalı Girişler / Tests d'erreurs
- Geçersiz ürün ID, boş alanlar, negatif miktar deneyin  
- Beklenen: Hata mesajı, veri yazılmamalı

---

## 🔧 Kurulum Talimatı / Instructions d’installation

### Backend (Node.js)
```bash
npm install
npm run dev
```

### Frontend
Tarayıcıda aç / Ouvrir dans un navigateur:  
`http://localhost:3000/index.html`

### Ortam Dosyası (.env)
```
PORT=3000
DB_PATH=./thrift_store_manager.db
```

---

## 👨‍💻 Teknolojiler / Technologies

- Backend: Node.js, Express, SQLite  
- Frontend: HTML, Bootstrap, JavaScript  
- Veritabanı / Base de données: SQLite  
- (Opsiyonel) CLI Aracı: C

---

## 📚 Öğrenilenler / Ce qu'on apprend

- REST API tasarımı  
- Frontend ve backend entegrasyonu  
- SQLite kullanımı  
- Express ile pratik proje geliştirme  
- Gerçek bir CRUD sisteminin mimarisi

---

## 🧠 Geliştirici Notu / Notes de l’auteur

Bu proje gerçek dünya CRUD uygulamalarına bir örnektir.  
Kullanıcı girişi, admin paneli, Stripe ödeme, istatistikler gibi birçok yönden geliştirilebilir.

> Basit başla, çalıştır, sonra geliştir 💡  
> Commence simple, fais marcher, puis améliore 💡