const express = require('express');
const app = express();
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

app.use(express.json());
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
