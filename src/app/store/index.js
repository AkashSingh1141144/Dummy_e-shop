import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../features/cart/cartSlice";
import productReducer from "../../features/products/productsSlice";
import authReducer from "../../features/auth/authSlice";

const store = configureStore({
	reducer: {
		products: productReducer,
		cart: cartReducer,
		auth: authReducer,
	},
})

export default store;