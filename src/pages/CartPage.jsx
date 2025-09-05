import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    setCart(stored ? JSON.parse(stored) : []);
  }, []);

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setNotification("Item removed from cart!");
    setTimeout(() => setNotification(null), 2000);
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, qty } : item
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleBuyNow = () => {
    setNotification("Thank you for your purchase! 🎉");
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    setTimeout(() => setNotification(null), 2500);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="text-center ">
      <NavBar/>
      {notification && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg animate-fade-in">
          {notification}
        </div>
      )}

      <h1 className="text-4xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="mt-14 flex flex-col items-center animate-fade-in-up">
          <img
            src="https://img.icons8.com/fluency/96/empty-box.png"
            alt="Empty"
            className="w-20 mb-5"
          />
          <p className="text-white text-lg mb-4">Your cart is empty!</p>
          <a
            href="/products"
            className="bg-yellow-400 text-blue-900 font-bold px-6 py-2 rounded-lg hover:bg-white hover:text-blue-900 transition"
          >
            Shop Products
          </a>
        </div>
      ) : (
        <div className="max-w-lg mx-auto space-y-6">
          {cart.map((item) => (
            <div
              className="flex items-center bg-gradient-to-r from-blue-950 to-yellow-400 rounded-xl shadow-lg p-5 gap-6 animate-zoom-in"
              key={item.id}
            >
              <img
                src={`${import.meta.env.VITE_API_URL.replace(/\/api$/, "")}/uploads/${item.image}`}
                alt={item.productname}
                className="w-20 h-20 object-contain rounded-lg bg-white shadow-md"
              />
              <div className="flex-1 text-left">
                <h2 className="text-lg font-bold text-yellow-400 mb-2">
                  {item.productname}
                </h2>
                <div className="flex items-center mb-3">
                  <button
                    className="bg-gray-200 text-lg px-3 py-1 rounded hover:bg-gray-300"
                    onClick={() => updateQty(item.id, item.qty - 1)}
                  >
                    -
                  </button>
                  <span className="mx-3 font-semibold">{item.qty}</span>
                  <button
                    className="bg-gray-200 text-lg px-3 py-1 rounded hover:bg-gray-300"
                    onClick={() => updateQty(item.id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="text-yellow-400 font-bold text-lg mr-4">
                  ₹{item.price * item.qty}
                </span>
                <button
                  className="bg-yellow-400 text-blue-900 font-semibold px-4 py-1 rounded hover:bg-white hover:text-blue-900 transition"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-8 border-t border-yellow-400/70 pt-6 animate-fade-in-up">
            <h2 className="text-xl font-bold text-white">Total: ₹{total}</h2>
            <button
              className="mt-4 bg-gradient-to-r from-yellow-400 to-white text-blue-900 font-extrabold px-10 py-3 rounded-xl shadow-md hover:from-blue-900 hover:to-blue-900 hover:text-yellow-400 transform hover:scale-105 transition"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
