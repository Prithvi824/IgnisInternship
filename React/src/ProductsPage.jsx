import { useLocation, useNavigate } from "react-router-dom";

function ProductPage() {
  const Location = useLocation();
  const Navigate = useNavigate()
  const product = Location.state?.selected;

  if (!product) {
    Navigate("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row font-moderustic">
        {/* Product Image */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-1">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.category}</p>

          <div className="flex items-center mb-4 font-poppins">
            <span className="text-2xl font-bold">₹{product.price}</span>
            {product.mrp && (
              <span className="ml-2 text-gray-500 line-through">
                ₹{product.mrp}
              </span>
            )}
          </div>

          {/* Meta Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Product Details</h2>
            <ul className="grid grid-cols-2 gap-2">
              {product.meta.map((item, index) => (
                <li key={index} className="text-sm">
                  <span className="font-medium text-lg">
                    {Object.keys(item)[0]}:
                  </span>{" "}
                  {Object.values(item)[0]}
                </li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-sm text-gray-700 font-poppins">
              {product.description.replace(/<!--[\s\S]*?-->/g, "").trim()}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
