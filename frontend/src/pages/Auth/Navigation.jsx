import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-zinc-400 px-5 py-5 w-full flex items-center justify-around fixed z-999">
      {/* header element */}
      <div className="px-2 hover:opacity-70">
        <Link to="/">
          <h1 className="font-bold text-[2em]">STORE</h1>
        </Link>
      </div>
      {/* input element */}
      <div className="flex items-center justify-center">
        <input
          className="w-[30vw] px-7 bg-white py-2 font-semibold rounded-md border-[1px] border-zinc-200 rounded-r-none"
          type="text"
          placeholder="Search in store"
        />
        <span className="px-3 py-2 rounded-md cursor-pointer bg-zinc-200 rounded-l-none  hover:opacity-70">
          <AiOutlineSearch size={26} />
        </span>
      </div>
      {/* desktop view */}
      <div className="justify-between items-center gap-9  text-center hidden md:flex">
        <Link to="/shop">
          <span className="truncate font-semibold text-md flex flex-col items-center justify-center text-center hover:scale-103">
            <AiOutlineShopping className="hover:opacity-100" size={27} />
            Shoping
          </span>
        </Link>
        <Link to="/cart">
          <span className="truncate font-semibold text-md flex flex-col items-center justify-center text-center hover:scale-103">
            <AiOutlineShoppingCart className="hover:opacity-100" size={27} />
            Cart
          </span>
        </Link>
        <Link to="/favorite">
          <span className="truncate font-semibold text-md flex flex-col items-center justify-center text-center hover:scale-103">
            <AiOutlineHeart className="hover:opacity-100" size={27} />
            Favourite
          </span>
        </Link>
      </div>
      {/* login and register */}
      <div className="flex justify-center items-center gap-3">
        <Link to="/login">
          <span className="px-3 py-2 text-white hover:opacity-85 bg-zinc-600 rounded-md font-semibold">
            LogIn
          </span>
        </Link>

        <Link to="/register">
          <span className="px-3 py-2 hover:opacity-85 text-white bg-zinc-600 rounded-md font-semibold">
            Register
          </span>
        </Link>
      </div>

      {/* mobile view */}
      <div className="flex justify-around bg-zinc-700 w-full py-5 items-center gap-9 text-white text-center md:hidden fixed bottom-0">
        <Link to="/shop">
          <span className="truncate font-semibold text-md flex flex-col items-center justify-center text-center hover:scale-103">
            <AiOutlineShopping className="hover:opacity-100" size={27} />
            Shoping
          </span>
        </Link>
        <Link to="/cart">
          <span className="truncate font-semibold text-md flex flex-col items-center justify-center text-center hover:scale-103">
            <AiOutlineShoppingCart className="hover:opacity-100" size={27} />
            Cart
          </span>
        </Link>
        <Link to="/favorite">
          <span className="truncate font-semibold text-md flex flex-col items-center justify-center text-center hover:scale-103">
            <AiOutlineHeart className="hover:opacity-100" size={27} />
            Favourite
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
