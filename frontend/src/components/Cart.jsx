import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="relative bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 pb-24">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-gray-600 text-sm">₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      –
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <p className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </p>
            <p className="flex justify-between text-sm">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </p>
            <p className="flex justify-between font-bold mt-2 text-base">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </p>
          </div>
        </>
      )}

      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md p-4 flex justify-between items-center z-50">
          <div className="text-lg font-semibold">Total: ₹{subtotal}</div>
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}