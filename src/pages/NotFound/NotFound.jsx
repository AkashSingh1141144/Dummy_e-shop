import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4">
      {/* Animated 404 Number */}
      <motion.h1
        className="text-7xl font-bold text-blue-600 mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 10 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        404
      </motion.h1>

	  {/* Animated Paragraph */}
      <motion.p
        className="text-2xl font-semibold text-gray-700 mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Oops! Page not found.
      </motion.p>

      <motion.p
        className="text-gray-500 mb-6 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </motion.p>

      {/* Animated Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;
