import { FaRegHeart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import {
  addFavoriteToLocalStorage,
  getFavoriteFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../utils/localStorage";
import { useEffect } from "react";


const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorites = favorites.some((pro) => pro._id === product._id);


  useEffect(() => {
    const favoritesFromLocalStorage = getFavoriteFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, [dispatch]);

  const toggleFavorites = () => {
    if (isFavorites) {
      dispatch(removeFromFavorites(product));

      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div className="absolute bottom-1/2 right-10 top-9 z-99 w-fit h-fit">
      <button onClick={toggleFavorites} className="cursor-pointer">
        {isFavorites ? (
          <MdDeleteOutline className="text-red-700 " size={30} />
        ) : (
          <FaRegHeart className="text-white" size={30} />
        )}
      </button>
    </div>
  );
};

export default HeartIcon;
