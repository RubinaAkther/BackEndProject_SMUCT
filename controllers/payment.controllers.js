const Payment = require('../models/payment.model.js');
const { z } = require('zod');


const paymentValidator = z.object({
  user: z.string().min(1, "User ID is required"),
  order: z.string().min(1, "Order ID is required"),
  amount: z.number().positive("Amount must be positive"),
  method: z.enum(['card', 'paypal', 'cash']).optional(),
  status: z.enum(['pending', 'completed', 'failed']).optional(),
});


const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('user', 'name email')
      .populate('order');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error: error.message });
  }
};


const getPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id)
      .populate('user', 'name email')
      .populate('order');

    if (!payment) return res.status(404).json({ message: "Payment not found" });

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment", error: error.message });
  }
};


const createPayment = async (req, res) => {
  try {
    const parsedData = paymentValidator.parse(req.body);

    const newPayment = await Payment.create(parsedData);
    res.status(201).json(newPayment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Error creating payment", error: error.message });
  }
};


const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;

  
    const parsedData = paymentValidator.partial().parse(req.body);

    const updatedPayment = await Payment.findByIdAndUpdate(id, parsedData, { new: true });

    if (!updatedPayment) return res.status(404).json({ message: "Payment not found" });

    res.status(200).json(updatedPayment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Error updating payment", error: error.message });
  }
};


const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) return res.status(404).json({ message: "Payment not found" });

    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting payment", error: error.message });
  }
};

module.exports = {
  getPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
};
