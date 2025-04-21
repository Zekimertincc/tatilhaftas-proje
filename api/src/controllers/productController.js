const db = require('../db');

exports.getAllProducts = (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
};

exports.createProduct = (req, res) => {
  const { name, price, stock, size, category } = req.body;
  db.run('INSERT INTO products (name, price, stock, size, category) VALUES (?, ?, ?, ?, ?)',
    [name, price, stock, size, category],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID });
      }
    });
};

exports.updateProduct = (req, res) => {
  const { name, price, stock, size, category } = req.body;
  const id = req.params.id;
  db.run('UPDATE products SET name=?, price=?, stock=?, size=?, category=? WHERE id=?',
    [name, price, stock, size, category, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ changes: this.changes });
      }
    });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM products WHERE id=?', id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ changes: this.changes });
    }
  });
};
