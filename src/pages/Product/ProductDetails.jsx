import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

function ProductDetails() {
  const { id } = useParams(); // URL se product id milti hai
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg font-semibold">Loading...</div>
    );
  }

  if (!product) {
    return (
      <div className="p-10 text-center text-lg font-semibold text-red-600">
        Product not found
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-52 ">
      {/* Image Section */}
      <div className="flex justify-center items-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-80 h-80 object-contain rounded-lg shadow-md"
        />
      </div>

      {/* Info Section */}
      <div>
        <h2 className="text-3xl font-bold mb-3">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <p className="text-xl font-semibold text-green-700 mb-2">
          ${product.price}
        </p>

        {product.rating && (
          <p className="text-gray-700 mb-4">
            ⭐ {product.rating.rate} / 5 ({product.rating.count} reviews)
          </p>
        )}

        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
