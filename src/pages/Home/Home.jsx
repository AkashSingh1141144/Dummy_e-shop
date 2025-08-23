import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { motion } from "framer-motion";

function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=6")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section
        className="relative h-[60vh] bg-gray-200 flex items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to E-Shop
          </motion.h1>
          <motion.p
            className="text-gray-700 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Best products, amazing deals!
          </motion.p>
          <motion.button
            onClick={() => (window.location.href = "/shop")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.button>
        </div>
      </motion.section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="border rounded-lg p-4 flex flex-col shadow hover:shadow-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain mx-auto mb-3"
              />
              <h3 className="font-semibold line-clamp-1">{product.title}</h3>
              <p className="text-gray-600 mb-3">${product.price}</p>
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                    })
                  )
                }
                className="mt-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Add to Cart
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Men", "Women", "Electronics", "Jewelery"].map((cat) => (
            <motion.div
              key={cat}
              className="bg-gray-100 p-6 rounded-lg text-center cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
              }}
            >
              <h3 className="font-semibold text-lg">{cat}</h3>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
