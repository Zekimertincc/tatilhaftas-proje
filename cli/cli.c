#include <stdio.h>
#include <sqlite3.h>

void menu() {
    printf("\n====== THRIFT STORE MANAGER CLI ======\n");
    printf("1 - Ürünleri Listele\n");
    printf("2 - Ürün Ekle\n");
    printf("3 - Ürün Sil\n");
    printf("4 - Stok Güncelle\n");
    printf("5 - CSV Export\n");
    printf("6 - CSV Import\n");
    printf("0 - Çıkış\n");
    printf("======================================\n");
}

void urunleriListele(sqlite3 *db) {
    sqlite3_stmt *stmt;
    const char *sql = "SELECT id, name, price, stock, size, category FROM products";

    int rc = sqlite3_prepare_v2(db, sql, -1, &stmt, NULL);

    if (rc != SQLITE_OK) {
        printf("Sorgu hazırlanamadı: %s\n", sqlite3_errmsg(db));
        return;
    }

    printf("\n--- Ürün Listesi ---\n");

    while (sqlite3_step(stmt) == SQLITE_ROW) {
        int id = sqlite3_column_int(stmt, 0);
        const unsigned char *name = sqlite3_column_text(stmt, 1);
        double price = sqlite3_column_double(stmt, 2);
        int stock = sqlite3_column_int(stmt, 3);
        const unsigned char *size = sqlite3_column_text(stmt, 4);
        const unsigned char *category = sqlite3_column_text(stmt, 5);

        printf("ID: %d | %s | %.2f€ | Stok: %d | Beden: %s | Kategori: %s\n",
               id, name, price, stock, size, category);
    }

    sqlite3_finalize(stmt);
}
void urunEkle(sqlite3 *db) {
    char name[100], size[10], category[50];
    double price;
    int stock;

    printf("Ürün Adı: ");
    scanf(" %[^\n]s", name);  // boşluklu string için
    printf("Fiyat: ");
    scanf("%lf", &price);
    printf("Stok: ");
    scanf("%d", &stock);
    printf("Beden: ");
    scanf(" %[^\n]s", size);
    printf("Kategori: ");
    scanf(" %[^\n]s", category);

    sqlite3_stmt *stmt;
    const char *sql = "INSERT INTO products (name, price, stock, size, category) VALUES (?, ?, ?, ?, ?)";

    if(sqlite3_prepare_v2(db, sql, -1, &stmt, NULL) != SQLITE_OK) {
        printf("Sorgu hazırlanamadı: %s\n", sqlite3_errmsg(db));
        return;
    }

    sqlite3_bind_text(stmt, 1, name, -1, SQLITE_STATIC);
    sqlite3_bind_double(stmt, 2, price);
    sqlite3_bind_int(stmt, 3, stock);
    sqlite3_bind_text(stmt, 4, size, -1, SQLITE_STATIC);
    sqlite3_bind_text(stmt, 5, category, -1, SQLITE_STATIC);

    if(sqlite3_step(stmt) != SQLITE_DONE) {
        printf("Ürün eklenemedi: %s\n", sqlite3_errmsg(db));
    } else {
        printf("Ürün başarıyla eklendi!\n");
    }

    sqlite3_finalize(stmt);
}





int main() {
    sqlite3 *db;
    int rc;

    rc = sqlite3_open("/Users/zekimertinceoglu/tatilhaftası/db", &db);

    if(rc) {
        printf("Veritabanı bağlantı HATASI: %s\n", sqlite3_errmsg(db));
        return 0;
    }

    printf("Veritabanına başarıyla bağlandın!\n");
    int choice;
    do{
        menu();
        
        printf("Seçiminiz: ");
        scanf("%d", &choice);

        switch(choice) {
            case 1:
                urunleriListele(db);
                printf("Ürünleri Listele seçildi.\n");

                break;
            case 2:
                urunEkle(db);
                printf("Ürün Ekle seçildi.\n");
                break;
            case 3:
                printf("Ürün Sil seçildi.\n");
                break;
            case 4:
                printf("Stok Güncelle seçildi.\n");
                break;
            case 5:
                printf("CSV Export seçildi.\n");
                break;
            case 6:
                printf("CSV Import seçildi.\n");
                break;
            case 0:
                printf("Çıkış yapılıyor...\n");
                break;
            default:
                printf("Geçersiz seçim. Tekrar deneyin.\n");
        }


    }while(choice!= 0);

    sqlite3_close(db);

    return 0;
}
