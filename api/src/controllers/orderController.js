
const db = require('../db');

exports.getAllOrders = (req, res) => {
  const sql = `
    SELECT orders.id, product_id, products.name AS product_name, quantity, date
    FROM orders
    JOIN products ON orders.product_id = products.id
  `;

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.createOrder = (req, res) => {
  const { product_id, quantity } = req.body;
  const date = new Date().toISOString();

  const sql = `INSERT INTO orders (product_id, quantity, date) VALUES (?, ?, ?)`;

  db.run(sql, [product_id, quantity, date], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, message: 'Sipariş başarıyla oluşturuldu' });
  });
};
