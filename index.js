const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/api/products', productRoute);

app.listen(3000, () => {
  console.log('server is running on port http://localhost:3000/');
});

app.get('/', (req, res) => {
  res.send('backend is working fine');
});

mongoose
  .connect(
    'mongodb+srv://rubinaakther3454_db_user:etZdzmeAKp94h3Av@cluster0.tptrdu4.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });
