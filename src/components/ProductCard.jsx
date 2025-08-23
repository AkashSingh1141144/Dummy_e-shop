import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="border rounded-lg shadow hover:shadow-lg p-4 flex flex-col bg-white">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mx-auto"
      />
      <h3 className="font-semibold mt-2 line-clamp-1">{product.title}</h3>
      <p className="text-gray-600">${product.price}</p>

      <div className="mt-3 flex justify-between items-center">
        <Link
          to={`/product/${product.id}`} // single product details page
          className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300"
        >
          View
        </Link>

        <button
          onClick={() =>
            dispatch(
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
              })
            )
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
