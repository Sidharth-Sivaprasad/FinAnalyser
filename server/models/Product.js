import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const ProductSchema = new Schema(
	{
		buyer: {
			type: mongoose.Types.Currency,
			currency: "USD",
			get: (v) => v / 100,
		},
		amount: {
			type: mongoose.Types.Currency,
			currency: "USD",
			get: (v) => v / 100,
		},
		productIds: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Transaction",
			},
		],
	},
	{ timestamps: true, toJSON: { getters: true } }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
