import { useSelector } from "react-redux"


const FavoritesCount = () => {
    const favorites = useSelector((state) => state.favorites)
    const favoriteCount = favorites.length
  return (
    <div className="absolute md:-top-3 top-1 md:left-9 z-99">
      {favoriteCount > 0 && (
        <span className="px-2 text-md text-white font-semibold bg-red-500 rounded-full">
            {favoriteCount}
        </span>
      )}
    </div>
  )
}

export default FavoritesCount
