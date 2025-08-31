import { useEffect, useState } from "react";
import { getProducts, deactivateProduct, activateProduct } from "../api/products";

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeactivate = async (id) => {
    await deactivateProduct(id);
    fetchProducts();
  };

  const handleActivate = async (id) => {
    await activateProduct(id);
    fetchProducts();
  };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <img
              src={`http://localhost:8080/uploads/${p.image}`}
              alt={p.productname}
              width="80"
            />
            <span>
              {p.productname} - ₹{p.price}
            </span>
            {p.active ? (
              <button onClick={() => handleDeactivate(p.id)}>Deactivate</button>
            ) : (
              <button onClick={() => handleActivate(p.id)}>Activate</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
