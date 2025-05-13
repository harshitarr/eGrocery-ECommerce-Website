import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  label: { type: String, required: true },
  imagePath: { type: String, required: true }
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
