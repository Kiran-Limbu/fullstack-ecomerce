import { useSelector } from "react-redux"

const CartItemsCount = () => {
    const {cartItems} =  useSelector((state) => state.cart);
    const cartItemsLength = cartItems.length;
  return (
   <div className="absolute md:-top-3 top-1 md:left-5 left-48 z-99">
      {cartItemsLength > 0 && (
        <span className="px-2 text-md text-white font-semibold bg-red-500 rounded-full">
            {cartItemsLength}
        </span>
      )}
    </div>
  )
}

export default CartItemsCount
