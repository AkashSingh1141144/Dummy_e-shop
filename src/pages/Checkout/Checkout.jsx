import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../features/cart/cartSlice";
import { motion } from "framer-motion";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shipping, setShipping] = useState({
    fullName: user?.username || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); 

  const handleChange = (e) =>
    setShipping({ ...shipping, [e.target.name]: e.target.value });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const { fullName, phone, address, city, state, pincode } = shipping;
    if (!fullName || !phone || !address || !city || !state || !pincode) {
      alert("Please fill all shipping details!");
      return;
    }

    alert(`🎉 Order placed successfully! Payment: ${paymentMethod}`);
    dispatch(clearCart());
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 text-center">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto py-10 px-4"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Shipping Address */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow space-y-4"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
          {[
            "fullName",
            "email",
            "phone",
            "address",
            "city",
            "state",
            "pincode",
          ].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={
                field.charAt(0).toUpperCase() +
                field.slice(1).replace("fullName", "Full Name")
              }
              value={shipping[field]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          ))}
        </motion.div>

        {/* Payment & Order Summary */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow space-y-4"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Card Payment (Simulation)
            </label>
          </div>

          <h3 className="text-xl font-semibold mt-4 mb-2">Order Summary</h3>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                className="flex justify-between"
                initial="hidden"
                animate="visible"
                variants={itemVariants}
              >
                <span>
                  {item.title} x {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </motion.div>
            ))}
          </div>

          <hr className="my-3" />
          <p className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </p>

          <motion.button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Place Order
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default Checkout;
