import { Link, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useGetProductQuery } from "../../redux/api/productApiSlice";
import HeaderProduuct from "../../components/product/HeaderProduct";
import FlashSaleProduct from "../../components/product/FlashSaleProduct";

const ProductPage = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductQuery({ keyword });

  
  if (isLoading) {
      return (
        <div className="flex items-center justify-center pt-[20vw] h-screen w-full opacity-80">
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
    <div className="w-full min-h-screen text-white">
      {!keyword ? <HeaderProduuct /> : null}
          <div className="flex items-center justify-around pt-7">
            <div className="flex items-center gap-7">
              <div className="w-2 h-9 rounded-md bg-zinc-500"></div>
          <h1 className="md:text-4xl text-2xl capitalize font-semibold">
            flash Sale
          </h1>
            </div>
          <Link className="px-7 py-3 hover:opacity-80 font-semibold bg-zinc-600 rounded-md" to="/favorite">Favorite</Link>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 px-7 py-9">
          {data.products.map((product) =>(
            <div key={product._id}>
            <FlashSaleProduct product={product} />
            </div>
          ))}
        </div>
   </div>
  );
};

export default ProductPage;
