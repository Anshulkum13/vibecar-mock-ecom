import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products?limit=6")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛍️ Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-sm p-4 hover:shadow-md transition">
            <img src={product.image} alt={product.title} className="w-full h-40 object-contain rounded" />
            <h3 className="mt-2 text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-600">₹{Math.floor(product.price * 85)}</p>
            <button
              onClick={() => addToCart({ ...product, price: Math.floor(product.price * 85) })}
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}