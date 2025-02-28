import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductListingForm = ({ onAddProduct }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    image: null,
    imagePreview: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePreview = URL.createObjectURL(file);
      setProduct({ ...product, image: file, imagePreview });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(product);
    navigate("/home"); // Redirect to homepage
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Post a Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleInputChange} className="w-full p-3 border rounded" required />
          <textarea name="description" placeholder="Description" value={product.description} onChange={handleInputChange} className="w-full p-3 border rounded" required />
          <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleInputChange} className="w-full p-3 border rounded" required />
          <input type="text" name="location" placeholder="Location" value={product.location} onChange={handleInputChange} className="w-full p-3 border rounded" required />
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="w-full p-3 border rounded" />
          {product.imagePreview && <img src={product.imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-md" />}
          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600">Post Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductListingForm;
