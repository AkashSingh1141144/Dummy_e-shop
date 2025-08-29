import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Cart() {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty 🛒</h2>
      </div>
    );
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 ">Shopping Cart</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="flex items-center gap-4 border p-4 rounded-lg shadow-sm bg-white"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div className="flex-1">
                  <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => dispatch(decreaseQty(item.id))}
                      className="px-2 py-1 border rounded-lg"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQty(item.id))}
                      className="px-2 py-1 border rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-600 mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="border p-6 rounded-lg shadow-lg h-fit bg-white">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <p className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal</span> <span>${totalAmount.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-gray-700 mb-4">
            <span>Shipping</span> <span>Free</span>
          </p>
          <hr />
          <p className="flex justify-between text-lg font-semibold mt-4">
            <span>Total</span> <span>${totalAmount.toFixed(2)}</span>
          </p>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-green-600 text-white py-2 rounded-lg mt-6 hover:bg-green-700"
          >
            Checkout
          </button>
          <button
            onClick={() => dispatch(clearCart())}
            className="w-full text-red-600 mt-3 hover:underline"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
