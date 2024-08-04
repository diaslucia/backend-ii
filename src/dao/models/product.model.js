import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  stock: { type: Number, required: true },
  category: String,
});

productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(productsCollection, productSchema);
