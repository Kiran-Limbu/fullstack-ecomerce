import { useGetTopProductQuery } from "../../redux/api/productApiSlice";
import { ClipLoader } from "react-spinners";
import ProductSlider from "./ProductSlider";
import { Link } from 'react-router-dom'

const HeaderProduuct = () => {
  const { data: topProductData, isLoading, error } = useGetTopProductQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center pt-[20vw] h-screen w-full opacity-80">
        <ClipLoader size={70} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center pt-[20vw] md:text-3xl text-lg text-red-500">
        ERROR ! Something went wrong
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-around">
      <div className="md:w-1/2 w-0 p-3">
        <div className="md:grid grid-cols-2 hidden">
          {topProductData?.map((product) => (
            <div key={product._id} className="py-3 px-2">
              <Link to={`/product/${product._id}`}>
              <img
                className="w-[30vw] h-[30vh] object-cover hover:shadow-xl bg-indigo-500 shadow-indigo-500/50 overflow-hidden rounded-md transition-all"
                src={product.image} 
                alt={product.name} 
                />
              <div className="flex justify-between pt-2">
                <p className="capitalize px-3 py-2 truncate">{product.name}</p>
                <span className="px-2 py-2 bg-zinc-600 rounded-md">$ {product.price.toFixed(2)}</span>
              </div>
                </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-[45vw] w-full overflow-hidden">
        <ProductSlider />
      </div>
    </div>
  );
};

export default HeaderProduuct;
