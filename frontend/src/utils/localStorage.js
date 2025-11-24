
export const getFavoriteFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem('favorites');
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}

export const addFavoriteToLocalStorage = (product) => {
    const favorite = getFavoriteFromLocalStorage();
    // Add a product to favorites, only if it’s not already added
    if (!favorite.some((pro => pro._id === product._id))) {
        favorite.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorite));
    }
}

export const removeFavoriteFromLocalStorage = (productId) =>{
    const favorite = getFavoriteFromLocalStorage();
    const updateFavorite = favorite.filter((product) => product._id !== productId);
    
    localStorage.setItem("favorites", JSON.stringify(updateFavorite));
}


