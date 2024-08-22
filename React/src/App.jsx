import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "./data/Scraped Data.json";

import "./App.css";
import Product from "./components/Product";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 10000]);
  const Navigate = useNavigate();

  // Combine all products into a single array
  const allProducts = Object.values(products).flat();

  // Apply filters
  const filteredProducts = allProducts.filter((product) => {
    return (
      (selectedCategory === "" || product.category === selectedCategory) &&
      product.price >= selectedPriceRange[0] &&
      product.price <= selectedPriceRange[1]
    );
  });

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    switch (value) {
      case "500":
        setSelectedPriceRange([0, 500]);
        break;
      case "1000":
        setSelectedPriceRange([500, 1000]);
        break;
      case "1500":
        setSelectedPriceRange([1000, 1500]);
        break;
      case "2000":
        setSelectedPriceRange([1500, 2000]);
        break;
      case "3000":
        setSelectedPriceRange([2000, 3000]);
        break;
      case "over3000":
        setSelectedPriceRange([3000, Infinity]);
        break;
      default:
        setSelectedPriceRange([0, Infinity]);
    }
  };

  function handleClick(product) {
    // Handles the Navigation to Product
    Navigate("/products", { state: { selected: product } });
  }


  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-montserrat mt-6">Product List</h1>
      <div className="filters font-moderustic mt-2">
        <select onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="men-oversized-t-shirts">Men&apos;s T-Shirts</option>
          <option value="mens-shorts-collection">Men&apos;s Shorts</option>
          <option value="best-selling-co-ord-sets">Best Co-ord sets</option>
          <option value="plus-size-t-shirts">
            Men&apos;s Plus size T-Shirts
          </option>
          <option value="pick-printed-t-shirts">
            Men&apos;s pick printed T-Shirts
          </option>
          <option value="fashion-joggers-men">Men&apos;s Joggers</option>
        </select>
        <select onChange={handlePriceChange}>
          <option value="all">All Prices</option>
          <option value="500">Under ₹500</option>
          <option value="1000">₹500 - ₹1000</option>
          <option value="1500">₹1000 - ₹1500</option>
          <option value="2000">₹1500 - ₹2000</option>
          <option value="3000">₹2000 - ₹3000</option>
          <option value="over3000">Above ₹3000</option>
        </select>
      </div>

      <h2 className="font-montserrat text-lg mt-8 w-11/12 text-left mb-4">
        Showing {filteredProducts.length} Items
      </h2>
      <div className="w-11/12 grid grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <Product products={filteredProducts} handleClick={handleClick} />
      </div>
    </div>
  );
}

export default App;
