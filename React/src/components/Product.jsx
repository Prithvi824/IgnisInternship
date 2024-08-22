import PropTypes from "prop-types";

function Product({ products, handleClick }) {
  return (
    <>
      {products.map((product, index) => {
        return (
          <div
            key={index}
            className="w-full rounded-lg overflow-hidden parent-container group cursor-pointer"
            onClick={() => {
              handleClick(product);
            }}
          >
            <div className="h-72 flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:brightness-75 "
              />
            </div>
            <h1 className="truncate font-poppins">{product.title}</h1>
            <h2 className=" font-montserrat text-base">
              ₹{product.price}{" "}
              {product.mrp ? (
                <>
                  <span className="line-through opacity-75 text-sm">
                    {product.mrp}
                  </span>
                  <span className="font-montserrat text-base text-green-600 font-bold">
                    {product.mrp - product.price} OFF/-
                  </span>
                </>
              ) : (
                ""
              )}
            </h2>
          </div>
        );
      })}
    </>
  );
}

Product.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      mrp: PropTypes.number,
    })
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Product;
