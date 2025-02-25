import React, { useState } from 'react';

const ProductListingForm = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle posting the product details to a server
    console.log('Product posted:', product);
    // Reset the form
    setProduct({
      title: '',
      description: '',
      price: '',
      location: '',
      image: null,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Post a Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product title"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Description:</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Price:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product price"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Location:</label>
            <input
              type="text"
              name="location"
              value={product.location}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product location"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Upload Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            Post Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductListingForm;
