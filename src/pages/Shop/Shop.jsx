import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { motion } from "framer-motion";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-center py-6">Shop Products</h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.length > 0 ? (
          products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            Loading products...
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default Shop;
