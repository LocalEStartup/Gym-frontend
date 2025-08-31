import { useState, useRef } from 'react';
import { addProduct } from "../../api/products";

function AddProducts() {
    const [formData, setFormData] = useState({
        productname: '',
        description: '',
        price: '',
        file: null,
    });

    const fileInputRef = useRef(null); // Reference for file input

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("productname", formData.productname);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("file", formData.file);
    
        try {
          await addProduct(data);
          alert("✅ Product added successfully");
    
          // Reset form
          setFormData({ productname: "", description: "", price: "", file: null });
          if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
          console.error("Error:", error);
          alert("❌ Failed to add product");
        }
      };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <label className='text-black'>Product Name:</label>
            <input type="text" name="productname" value={formData.productname} onChange={handleChange} required className='border-2 rounded-xl p-2 border-yellow-400 text-black focus:outline-yellow-500' />

            <label className='text-black'>Description:</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} required className='border-2 rounded-xl p-2 border-yellow-400 text-black focus:outline-yellow-500' />


            <label className='text-black'>Price:</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required className='border-2 rounded-xl p-2 border-yellow-400 text-black focus:outline-yellow-500' />

            <label className='text-black'>Image:</label>
            <input type="file" name="file" ref={fileInputRef} onChange={handleFileChange} required className='border-2 rounded-xl p-2 border-yellow-400 text-black focus:outline-yellow-500' />

            <button type="submit" className='border-2 text-lg hover:border-yellow-400 rounded-xl bg-yellow-400 p-3 hover:bg-gray-100 hover:text-yellow-400 cursor-pointer'>Add Product</button>
        </form>
    );
}

export default AddProducts;
