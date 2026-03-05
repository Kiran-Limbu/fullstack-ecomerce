import { useGetSearchProductsQuery } from "../../redux/api/productApiSlice";
import { Link, useLocation } from "react-router-dom";
import Rating from "../product/Rating";
import { ClipLoader } from "react-spinners";

const SearchPage = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const keyword = urlParams.get("keyword") || "";

  const {
    data: productData,
    isLoading,
    isError,
  } = useGetSearchProductsQuery({keyword});

     if (isLoading) {
        return (
          <div className="flex items-center justify-center pt-[20vw] h-screen w-full opacity-80">
            <ClipLoader size={70} />
          </div>
        );
      }

  if (isError) {
     return (
     <div className="flex justify-center items-center pt-[20vw] md:text-2xl text-md font-semibold text-red-600">
        Error loading products
      </div>
  )
  }

  return (
    <>
      <div className="text-white font-semibold text-2xl px-4 py-3">
        Results For: " {keyword} "
      </div>
      <div className="grid md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 grid-col-1 w-full">
        {productData.products.length === 0 ? (
          <div className="pt-[20vw] font-semibold md:text-4xl text-2xl text-white">
            No products found !!
          </div>
        ) : (
          productData.products.map((product) => (
            <div className="px-2 py-3" key={product._id}>
              <Link to={`/product/${product._id}`}>
                <div className="border-none hover:shadow-lg shadow-zinc-500/50 transition-all rounded-md w-full h-full pt-5 px-4 text-white">
                  <img
                    className="md:w-[30vw] w-full h-[40vh] object-cover overflow-hidden rounded-md"
                    src={product.image}
                    alt={product.name}
                  />
                  <h1 className="capitalize font-semibold truncate text-xl text-white py-3">
                    {product.name}
                  </h1>
                  <h2 className="py-2 font-semibold text-red-500">
                    $ {product.actualPrice.toFixed(2)}
                  </h2>
                  <span className="py-2 px-2">
                    <Rating value={product.rating} />
                  </span>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default SearchPage;
