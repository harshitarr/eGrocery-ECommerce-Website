import {Schema,models,model} from 'mongoose'

const bundleSchema = new Schema({

  name: String,
  weight: String,
  description: String,
  items: Number,
  price: Number,
  image: String,
})

const BundleModel = models.PopularBundle || model('PopularBundle',bundleSchema)

export default BundleModel