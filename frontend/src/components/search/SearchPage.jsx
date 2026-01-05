import { ClipLoader } from "react-spinners";
import { useGetSearchProductsQuery } from "../../redux/api/productApiSlice";
import { Link, useLocation } from "react-router-dom";
import Rating from "../product/Rating";

const SearchPage = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const keyword = urlParams.get("p") || "";

  const {
    data: productData = [],
    isLoading,
    isError,
  } = useGetSearchProductsQuery({ keyword });


  if (isLoading) {
    return (
      <div className="flex items-center justify-center pt-[20vw] h-screen w-full">
        <ClipLoader size={70} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center pt-[20vw] md:text-3xl text-lg text-red-500">
        ERROR ! Something went wrong
      </div>
    );
  }

  return (
    <>
      <div className="text-white font-semibold text-2xl px-4 py-3">
        Results For: " {keyword} "
      </div>
      <div className="grid md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 grid-col-1">
        {productData.products.length === 0 ? (
          <div className="   pt-[20vw] font-semibold md:text-4xl text-2xl text-white">
            No products found !!
          </div>
        ) : (
          productData.products.map((product) => (
            <div className="px-2 py-3" key={product._id}>
              <Link className="" to={`/product/${product._id}`}>
                <div className="border-none hover:shadow-lg shadow-zinc-500/50 transition-all rounded-md w-full h-full pt-5 px-4 text-white">
                  <img
                    className="w-[30vw] h-[40vh] object-cover overflow-hidden rounded-md"
                    src={product.image}
                    alt={product.name}
                  />
                  <h1 className="font-semibold truncate text-xl text-white py-3">
                    {product.description}
                  </h1>
                  <h2 className="py-2 font-semibold text-red-500">
                    $ {product.price.toFixed(2)}
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
