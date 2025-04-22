const express = require('express');
const app = express();
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const ordersRoutes = require('./routes/orderRoutes.js');
const path = require('path');

app.use(express.static(path.join(__dirname, '../')));
app.use(express.json());
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
