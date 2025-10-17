const mongoose = require('mongoose');

const FavouriteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Favourite = mongoose.model('Favourite', FavouriteSchema);

module.exports = Favourite;
