import { createSlice } from "@reduxjs/toolkit";

//  Load initial state from localStorage
const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalQuantity: JSON.parse(localStorage.getItem("cartTotalQty")) || 0,
  totalAmount: JSON.parse(localStorage.getItem("cartTotalAmount")) || 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalAmount += product.price;

      //  Save to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("cartTotalQty", JSON.stringify(state.totalQuantity));
      localStorage.setItem(
        "cartTotalAmount",
        JSON.stringify(state.totalAmount)
      );
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((item) => item.id === id);

      if (existing) {
        state.totalQuantity -= existing.quantity;
        state.totalAmount -= existing.price * existing.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("cartTotalQty", JSON.stringify(state.totalQuantity));
      localStorage.setItem(
        "cartTotalAmount",
        JSON.stringify(state.totalAmount)
      );
    },

    increaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity++;
        state.totalQuantity++;
        state.totalAmount += item.price;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("cartTotalQty", JSON.stringify(state.totalQuantity));
      localStorage.setItem(
        "cartTotalAmount",
        JSON.stringify(state.totalAmount)
      );
    },

    decreaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
        state.totalQuantity--;
        state.totalAmount -= item.price;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("cartTotalQty", JSON.stringify(state.totalQuantity));
      localStorage.setItem(
        "cartTotalAmount",
        JSON.stringify(state.totalAmount)
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartTotalQty");
      localStorage.removeItem("cartTotalAmount");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
