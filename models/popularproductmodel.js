import { Schema, model, models } from "mongoose";

const popularproductSchema = new Schema({
  name: String,
  weight: String,
  description: String,
  quantity: Number,  
  price: Number,
  image: String,
});

const PopularModel = models.PopularProduct || model('PopularProduct', popularproductSchema);

export default PopularModel;