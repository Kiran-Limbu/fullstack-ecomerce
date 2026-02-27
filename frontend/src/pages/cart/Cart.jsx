import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () =>{
    navigate("/login?redirect=/shipping");
  }

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="text-3xl pt-50 font-semibold text-zinc-400 text-center">
          Sorry ! No Product is Added,
          <Link
            className="text-red-500 hover:opacity-88 underline underline-offset-1"
            to="/"
          >
            Go To Shop
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col text-white px-5 py-7">
            <h1 className="font-semibold text-3xl">Shoping Cart</h1>
          </div>
          <div className="flex flex-col gap-5 px-9 py-5">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center flex-col md:flex-row gap-9 "
              >
                <div className="md:w-[20vw] md:h-[20vh] w-1/2 h-1/2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover overflow-hidden"
                  />
                </div>
                <div className="md:grid grid-cols-3 flex flex-col items-center gap-3 md:w-full">
                  <div className="text-white font-semibold capitalize text-xl flex flex-col gap-4">
                    <Link to={`/product/${item._id}`}> {item.name} </Link>
                    <span className="text-red-500">
                      $ {item.price.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    {/* Generate numbers dynamically */}
                    <select
                      className="px-3 py-3 border-1 rounded-md font-semibold"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}

                    </select>
                  </div>
                  <div>
                    <button
                      className="px-2 py-4 font-semibold text-white cursor-pointer hover:opacity-85 border-none bg-red-500 rounded-md"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      Remove From Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center w-full">
            <div className="py-6 px-5 border md:w-1/2 w-full bg-transparent rounded-md text-white">
              <div className="font-semibold flex flex-col gap-3">
                <h1 className="text-xl">Cart Total</h1>
                <p>Items: ({cartItems.length})</p>
                <h2>
                  Total Price : $   
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </h2>
                <button
                className="px-2 py-4 font-semibold text-white cursor-pointer hover:opacity-85 border-none bg-zinc-500 rounded-md"
                disabled={cartItems.length === 0 }
                onClick={checkoutHandler}
                >
                  Process to checkout
                </button>
              </div>
            </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
