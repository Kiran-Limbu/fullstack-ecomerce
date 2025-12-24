import { Link, NavLink, Outlet } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import { ClipLoader } from "react-spinners";
import { FaArrowRightLong } from "react-icons/fa6";

const AllProducts = () => {
  const { data: products, isLoading, error } = useAllProductsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center pt-[20vw]">
        <ClipLoader size={70} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center pt-[20vw] md:text-2xl text-md font-semibold text-red-600">
        Error loading products
      </div>
    );
  }

  
  return (
    <div className="w-full h-full text-white">
      <div className="flex flex-col">
        <div className="p-4">
          <div className="flex justify-end">
            <AdminMenu />
          </div>
          <div className="md:text-2xl text-md font-bold">
            All Products ({products.length})
          </div>
          {products?.length === 0 ? (
            <div className="text-2xl text-red-600 font-semibold capitalize flex justify-center pt-[20vw]">
              Sorry ! no product is available{" "}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 grid-col-1 gap-5">
              {products?.map((product) => (
                <div
                  key={product._id}
                  className="hover:scale-102 cursor-pointer py-5"
                >
                  <div className="flex flex-col gap-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full md:h-[20vw] h-[40vh] md:w-full sm:w-[40vw] object-cover overflow-hidden rounded-md"
                      />
                    <div className="px-2 capitalize font-semibold text-xl md:text-md">
                      <h1>{product.name}</h1>
                    </div>
                    <div className="px-3">
                      <span>
                        {moment(product.createdAt).format("MMM DD YYYY")}
                      </span>
                    </div>
                    <div className="px-3 font-md truncate">
                      <span>{product.description.substring(0, 35)}....</span>
                    </div>
                    <div className="px-3 font-md text-red-500">
                      <span>$ {product.price.toFixed(2)}</span>
                    </div>
                    <div className="px-3">
                      <Link
                        className=" flex items-center gap-5 font-semibold border-none hover:opacity-95 py-2 px-5 rounded-md bg-zinc-700"
                        to={`/admin/product/update/${product._id}`}
                      >
                        Update Product
                        <FaArrowRightLong />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
