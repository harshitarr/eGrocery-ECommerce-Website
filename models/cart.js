import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Bundle' },
  name: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);