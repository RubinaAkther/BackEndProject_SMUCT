const Review = require('../models/review.model.js');
const { z } = require('zod');

const reviewValidator = z.object({
  user: z.string().min(1, 'User ID is required'),
  product: z.string().min(1, 'Product ID is required'),
  rating: z
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5'),
  comment: z.string().optional(),
});

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name email')
      .populate('product', 'name price');
    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching reviews', error: error.message });
  }
};

const getReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id)
      .populate('user', 'name email')
      .populate('product', 'name price');

    if (!review) return res.status(404).json({ message: 'Review not found' });

    res.status(200).json(review);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching review', error: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const parsedData = reviewValidator.parse(req.body);

    const newReview = await Review.create(parsedData);
    res.status(201).json(newReview);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res
      .status(500)
      .json({ message: 'Error creating review', error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const parsedData = reviewValidator.partial().parse(req.body);

    const updatedReview = await Review.findByIdAndUpdate(id, parsedData, {
      new: true,
    });

    if (!updatedReview)
      return res.status(404).json({ message: 'Review not found' });

    res.status(200).json(updatedReview);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res
      .status(500)
      .json({ message: 'Error updating review', error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview)
      return res.status(404).json({ message: 'Review not found' });

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting review', error: error.message });
  }
};

module.exports = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
