import React, { useState, useEffect } from "react";
import "./CartPage.css";

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    setCart(stored ? JSON.parse(stored) : []);
  }, []);

  const removeFromCart = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setNotification("Item removed from cart!");
    setTimeout(() => setNotification(null), 2000);
  };

  const updateQty = (id: number, qty: number) => {
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
    <div className="cart-page animate__fadeIn">
      {notification && <div className="notification">{notification}</div>}
      <h1 className="cart-title">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="empty-cart animate__fadeInUp">
          <img
            src="https://img.icons8.com/fluency/96/empty-box.png"
            alt="Empty"
          />
          <p>Your cart is empty!</p>
          <a href="/products" className="back-to-products">
            Shop Products
          </a>
        </div>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div className="cart-card animate__zoomIn" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-img" />
              <div>
                <h2>{item.name}</h2>
                <div className="qty-section">
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item.id, item.qty - 1)}
                  >
                    -
                  </button>
                  <span className="qty-num">{item.qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item.id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="cart-price">₹{item.price * item.qty}</span>
                <button
                  className="cart-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="checkout-section animate__fadeInUp">
            <h2>Total: ₹{total}</h2>
            <button className="checkout-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
