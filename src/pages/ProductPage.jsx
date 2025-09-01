import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

const ProductPage = () => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  const [products, setProducts] = useState([]);

  // ✅ Fetch products using async/await
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL+ "/products");
        // console.log(res);
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Unexpected response:", data);
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    setCart(storedCart ? JSON.parse(storedCart) : []);
  }, []);

  // ✅ Add product to cart
  const addToCart = (product) => {
    let newCart = [...cart];
    const idx = newCart.findIndex((item) => item.id === product.id);

    if (idx > -1) {
      newCart[idx].qty += 1;
      setNotification(`${product.name} quantity increased!`);
    } else {
      newCart.push({ ...product, qty: 1 });
      setNotification(`${product.name} added to cart!`);
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));

    // Cart button animation
    const cartBtn = document.getElementById("cart-btn");
    if (cartBtn) {
      cartBtn.classList.add("animate-shake");
      setTimeout(() => cartBtn.classList.remove("animate-shake"), 500);
    }

    // Clear notification
    setTimeout(() => setNotification(null), 2000);
  };

  const totalQty = cart.reduce((sum, prod) => sum + (prod.qty || 1), 0);

  return (
    <div className="text-center animate-fadeIn">
      <NavBar />

      {notification && (
        <div className="fixed top-6 right-8 bg-green-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg animate-fadeIn">
          {notification}
        </div>
      )}

      <h1 className="text-[#fed600] text-4xl font-extrabold mb-8 drop-shadow-[2px_2px_0px_#0d1b3e]">
        Buy Supplements
      </h1>

      <div className="flex flex-wrap gap-10 justify-center">
        {products.length > 0 ? (
          products.map((prod) => (
            <div
              key={prod.id}
              className="bg-gradient-to-tr from-[#0d1b3e] to-[#fed600] text-white rounded-xl shadow-xl w-64 p-6 transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl animate-zoomIn relative"
            >
              <img
                src={prod.image}
                alt={prod.name}
                className="w-28 h-28 object-contain mb-4 rounded-lg bg-white shadow-md transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3 mx-auto"
              />
              <h2 className="text-[#fed600] text-xl font-bold mb-2">
                {prod.name}
              </h2>
              <p className="text-sm opacity-90 mb-4">{prod.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-[#fed600] font-extrabold text-lg tracking-wide">
                  ₹{prod.price}
                </span>
                <button
                  className="bg-[#fed600] text-[#0d1b3e] font-bold px-4 py-2 rounded-lg shadow-md hover:bg-white hover:text-[#0d1b3e] transform hover:scale-105 transition cursor-pointer"
                  onClick={() => addToCart(prod)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <a
        href="/cart"
        id="cart-btn"
        className="inline-block mt-10 bg-[#fed600] text-[#0d1b3e] font-extrabold rounded-full px-10 py-3 text-lg shadow-md hover:bg-[#0d1b3e] hover:text-[#fed600] transition duration-200 animate-fadeInUp cursor-pointer"
      >
        🛒 View Cart ({totalQty})
      </a>
    </div>
  );
};

export default ProductPage;
