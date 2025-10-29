import React from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ProductList />
      <Cart />
    </div>
  );
}