import { useSelector } from "react-redux"


const FavoritesCount = () => {
    const favorites = useSelector((state) => state.favorites)
    const favoriteCount = favorites.length
  return (
    <div className="absolute bottom-1/2 top-1 right-[23%] z-99">
      {favoriteCount > 0 && (
        <span className="px-2 text-md font-semibold bg-amber-500 rounded-full">
            {favoriteCount}
        </span>
      )}
    </div>
  )
}

export default FavoritesCount
