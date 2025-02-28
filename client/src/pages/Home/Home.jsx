import Header from "../../Components/Header/Header";

function Home({ products }) {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
<Header />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products posted yet.</p>
        ) : (
          products.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              {product.imagePreview && (
                <img src={product.imagePreview} alt="Product" className="w-full h-40 object-cover rounded-md" />
              )}
              <h2 className="text-xl font-bold mt-2">{product.title}</h2>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-blue-600 font-semibold mt-1">${product.price}</p>
              <p className="text-gray-500 text-sm">{product.location}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
