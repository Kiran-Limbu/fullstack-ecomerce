import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import FlashSaleProduct from "../../components/product/FlashSaleProduct";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";


const FavoritePage = () => {
  const favorites = useSelector(selectFavoriteProduct);


  if (!favorites || favorites?.length === 0) {
    return (
      <div className="flex justify-center flex-col items-center gap-10">
        <div className="text-2xl text-red-600 font-semibold capitalize flex justify-center pt-[20vw]">
          Sorry ! no product available
        </div>
        <div>
          <Link
            className="hover:scale-102 px-5 py-5 font-semibold flex items-center gap-7 bg-zinc-600 rounded-md md:text-lg text-md"
            to="/"
          >
            Find Product 
           <FaArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="px-2 py-5 text-white">
      <div className="px-5 py-6">
        <h1 className="font-semibold md:text-2xl text-md">
          Your Favorites ({favorites.length})
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-5 grid-cols-1 px-7 py-9 w-fit h-full">
        {favorites.map((product) => (
          <FlashSaleProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;
