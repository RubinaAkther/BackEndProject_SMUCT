const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const productRoute = require('./routes/product.route.js');
const userRoute = require('./routes/user.route.js');
const orderRoute = require('./routes/order.route.js');
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);

app.listen(3000, () => {
  console.log('server is running on port http://localhost:3000/');
});

app.get('/', (req, res) => {
  res.send('backend is working fine');
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });
