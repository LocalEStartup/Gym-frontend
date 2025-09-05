import React, { useEffect, useState } from "react";
import {
    getProducts,
    getProductById,
    updateProduct,
    toggleActive,
    deleteProductPermanent,
} from "../../api/products.js";   // adjust path as needed


function Products() {
    const API = import.meta.env.VITE_API_URL; // e.g., http://localhost:5000/api
    const [products, setProducts] = useState([]);
    const [paymentFilter, setPaymentFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null); // modal state
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);

    // Fetch products
    // fetch all
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await getProducts();
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Filter products
    const filteredProducts = products.filter((p) => {
        if (paymentFilter === "All") return true;
        return paymentFilter === "Active" ? p.active === 1 : p.active === 0;
    });

    // toggle active
    const handleToggleActive = async (id) => {
        // Optimistically update UI
        setProducts((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, active: Number(!p.active) } : p
            )
        );
        try {
            await toggleActive(id);
            // Optionally refetch for freshness
            fetchProducts();
        } catch (e) {
            console.error("Toggle active failed", e);
            // (Optional) revert UI state on error here
            fetchProducts();
        }
    };

    // fetch single
    const fetchProductByIdFn = async (id) => {
        try {
            const res = await getProductById(id);
            return res.data;
        } catch (e) {
            console.error("Error fetching product:", e);
            return null;
        }
    };

    // delete
    const handleDelete = async (id) => {
        if (!confirm("Delete this product permanently? This cannot be undone.")) return;
        try {
            await deleteProductPermanent(id);
            fetchProducts();
        } catch (e) {
            console.error("Delete failed", e);
        }
    };

    // Save edits
    const handleSaveEdit = async () => {
        if (!editingProduct) return;
        try {
            setSaving(true);
            const formData = new FormData();
            formData.append("productname", editingProduct.productname ?? "");
            formData.append("description", editingProduct.description ?? "");
            formData.append("price", editingProduct.price ?? "");
            if (editingProduct.newImage) {
                formData.append("file", editingProduct.newImage);
            }

            await updateProduct(editingProduct.id, formData);
            setShowModal(false);
            setEditingProduct(null);
            fetchProducts();
        } catch (e) {
            console.error("Update failed", e);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-4">
            {/* Filter Section */}
            <div className="flex gap-4 mb-4 text-brand-cusprimary">
                <select
                    className="border p-2 rounded bg-gray-200"
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    value={paymentFilter}
                >
                    <option value="All">All Products</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-brand-cusprimary">
                            <th className="p-2 border">Product ID</th>
                            <th className="p-2 border">Product Name</th>
                            <th className="p-2 border">Description</th>
                            <th className="p-2 border">Price</th>
                            <th className="p-2 border">Image</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="text-center p-4 text-gray-500">
                                    Loading products...
                                </td>
                            </tr>
                        ) : filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <tr key={product.id} className="border text-brand-cusprimary">
                                    <td className="px-2 text-center border">{product.id}</td>
                                    <td className="px-2 border">{product.productname}</td>
                                    <td className="px-2 border">{product.description}</td>
                                    <td className="px-2 border">₹ {product.price}</td>
                                    <td className="px-2 border">
                                        {product.image ? (
                                            <img
                                                src={`${API.replace(/\/api$/, "")}/uploads/${product.image}`}
                                                alt={product.productname}
                                                className="w-16 h-16 object-cover rounded py-2"
                                            />
                                        ) : (
                                            <span className="text-gray-500">No image</span>
                                        )}
                                    </td>
                                    <td className="px-2 h-full">
                                        {/* The Toggle */}
                                        <div className="flex justify-center items-center h-full">
                                            <button
                                                type="button"
                                                aria-pressed={product.active === 1}
                                                className={`w-12 h-6 flex items-center rounded-full transition-colors ${product.active === 1 ? "bg-green-500" : "bg-gray-300"} p-1`}
                                                onClick={() => handleToggleActive(product.id)}
                                                style={{ minWidth: "3rem" }}
                                            >
                                                <span
                                                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${product.active === 1 ? "translate-x-6" : "translate-x-0"}`}
                                                />
                                            </button>
                                        </div>
                                    </td>



                                    <td className="px-2 border text-center space-x-2">
                                        <button
                                            className="px-2 py-1 bg-brand-cussecondary text-white rounded"
                                            onClick={async () => {
                                                const freshProduct = await getProductById(product.id);
                                                if (freshProduct) {
                                                    setEditingProduct(freshProduct.data); // axios wraps in .data
                                                    setShowModal(true);
                                                }
                                                else {
                                                    alert("Failed to load product details.");
                                                }
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="px-2 py-1 bg-red-600 text-white rounded"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center p-4 text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for editing */}
            {showModal && editingProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 text-black z-50">
                    <div className="bg-white rounded-lg p-6 w-[28rem]">
                        <h2 className="text-lg font-bold mb-4">Edit Product</h2>

                        <label className="text-sm text-gray-600">Product Name</label>
                        <input
                            type="text"
                            value={editingProduct.productname ?? ""}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, productname: e.target.value })
                            }
                            className="w-full border p-2 mb-2 rounded"
                            placeholder="Product Name"
                        />

                        <label className="text-sm text-gray-600">Description</label>
                        <textarea
                            value={editingProduct.description ?? ""}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, description: e.target.value })
                            }
                            className="w-full border p-2 mb-2 rounded"
                            placeholder="Description"
                        />

                        <label className="text-sm text-gray-600">Price</label>
                        <input
                            type="number"
                            value={editingProduct.price ?? ""}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, price: e.target.value })
                            }
                            className="w-full border p-2 mb-2 rounded"
                            placeholder="Price"
                        />

                        <div className="mb-3">
                            <label className="block text-sm text-gray-600">Current Image</label>
                            {editingProduct.image ? (
                                <div className="flex items-center gap-3">
                                    <img
                                        src={`${API.replace(/\/api$/, "")}/uploads/${editingProduct.image}`}
                                        alt="current"
                                        className="w-16 h-16 object-cover rounded border"
                                    />
                                    <span className="text-sm text-gray-600 break-all">
                                        {editingProduct.image}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-gray-500 text-sm">No image</span>
                            )}
                        </div>

                        <label className="block text-sm text-gray-600">Replace Image</label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setEditingProduct({
                                    ...editingProduct,
                                    newImage: e.target.files && e.target.files[0],
                                })
                            }
                            className="w-full border p-2 mb-4 rounded"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-400 text-white rounded"
                                onClick={() => {
                                    setShowModal(false);
                                    setEditingProduct(null);
                                }}
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
                                onClick={handleSaveEdit}
                                disabled={saving}
                            >
                                {saving ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Products;
