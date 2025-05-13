import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  weight: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, default: 0 } 
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
