const API_BASE = "http://localhost:3000";

async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  const products = await res.json();
  renderProductList(products);
  fillProductDropdown(products);
}

function renderProductList(products) {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach((p) => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">
            Fiyat: ${p.price}₺<br/>
            Stok: ${p.stock}<br/>
            Beden: ${p.size}<br/>
            Kategori: ${p.category}
          </p>
        </div>
      </div>
    `;

    list.appendChild(col);
  });
}

function fillProductDropdown(products) {
  const select = document.getElementById("productSelect");
  select.innerHTML = "";

  products.forEach((p) => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = `${p.name} (${p.stock} stok)`;
    select.appendChild(option);
  });
}

document.getElementById("order-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const product_id = document.getElementById("productSelect").value;
  const quantity = document.getElementById("quantity").value;

  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id, quantity })
  });

  const data = await res.json();
  const msg = document.getElementById("order-msg");

  if (res.ok) {
    msg.textContent = "Sipariş başarıyla oluşturuldu!";
    fetchProducts(); // stok güncellemesi için yeniden listele
  } else {
    msg.textContent = "Sipariş başarısız: " + (data.error || "Bilinmeyen hata");
  }
});

fetchProducts();
