import React, { useState, useEffect } from "react";
import "./ProductPage.css";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
}

interface CartProduct extends Product {
  qty: number;
}

// const products: Product[] = [
//   {
//     id: 1,
//     name: "Whey Protein",
//     price: 2500,
//     image:
//       "https://cdn.shopify.com/s/files/1/0267/6506/4116/products/ONGoldStandardWhey_2lb-Front_900x.jpg",
//     desc: "24g protein/serving. Build & recover muscle with premium whey.",
//   },
//   {
//     id: 2,
//     name: "Creatine Monohydrate",
//     price: 1100,
//     image:
//       "https://cdn.shopify.com/s/files/1/0267/6506/4116/products/ONMicronizedCreatine-300g-Front_900x.jpg",
//     desc: "5g micronized creatine for power and recovery.",
//   },
//   {
//     id: 3,
//     name: "Pre-Workout",
//     price: 1800,
//     image:
//       "https://cdn.shopify.com/s/files/1/0267/6506/4116/products/ONGoldStandardPre-Workout-30Servings-Front_900x.jpg",
//     desc: "Energy, focus, and pump to fuel your workouts.",
//   },
//   {
//     id: 4,
//     name: "BCAA",
//     price: 1350,
//     image:
//       "https://cdn.shopify.com/s/files/1/0267/6506/4116/products/ONAminoEnergy-30Servings-Front_900x.jpg",
//     desc: "Branched-chain amino acids for muscle retention and recovery.",
//   },
// ];



const ProductPage: React.FC = () => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Unexpected response:", data);
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
      });
  }, []);


  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    setCart(storedCart ? JSON.parse(storedCart) : []);
  }, []);

  const addToCart = (product: Product) => {
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

    // Animation on add
    const cartBtn = document.getElementById("cart-btn");
    if (cartBtn) {
      cartBtn.classList.add("shake");
      setTimeout(() => cartBtn.classList.remove("shake"), 500);
    }

    // Clear notification after 2s
    setTimeout(() => setNotification(null), 2000);
  };

  // Get total qty for cart icon
  const totalQty = cart.reduce((sum, prod) => sum + (prod.qty || 1), 0);

  return (
    <div className="product-page animate__fadeIn">
      {notification && <div className="notification">{notification}</div>}
      <h1 className="product-title">Buy Supplements</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((prod) => (
            <div className="prod-card animate__zoomIn" key={prod.id}>
            <img src={prod.image} alt={prod.name} className="prod-img" />
            <h2>{prod.name}</h2>
            <p>{prod.desc}</p>
            <div className="prod-bottom">
              <span className="prod-price">₹{prod.price}</span>
              <button className="add-btn" onClick={() => addToCart(prod)}>
                Add to Cart
              </button>
            </div>
          </div>
          ))
        ) : (
          <p>No products found.</p>
        )}

        
      </div>
      <a href="/cart" id="cart-btn" className="view-cart-btn">
        <span role="img" aria-label="cart">
          🛒
        </span>{" "}
        View Cart ({totalQty})
      </a>
    </div>
  );
};

export default ProductPage;
