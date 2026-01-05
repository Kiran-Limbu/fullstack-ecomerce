import {
  AiOutlineHeart,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaProductHunt } from "react-icons/fa6";
import { TbCategoryPlus } from "react-icons/tb";
import { TbBorderSides } from "react-icons/tb";
import { RiUserSearchFill } from "react-icons/ri";
import { motion, AnimatePresence } from "motion/react";
import FavoritesCount from "../../components/nav/FavoritesCount";
import CartItemsCount from "../../components/nav/CartItemsCount";
import SerchProduct from "../../components/search/SerchProduct";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [userDropedown, setUserDropedown] = useState(false);
  const [adminDropdown, setAdminDropdown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-zinc-300 px-3 py-6 w-full flex items-center justify-around sticky top-0 z-[999]">
      {/* header element */}
      <div className="px-2 hover:opacity-70">
        <Link to="/">
          <h1 className="font-bold text-lg md:text-[2em]">STORE</h1>
        </Link>
      </div>
      
      {/* input element */}
     <SerchProduct />


      {/* desktop view */}
      <div className="justify-between items-center gap-9  text-center hidden md:flex">
       
        <Link to="/cart">
        <div className="relative">
          <span className="truncate font-semibold text-md flex flex-col items-center text-center hover:scale-103">
            <AiOutlineShoppingCart className="hover:opacity-100" size={27} />
            Cart
          </span>
           {/* count cartItems in cart  */}
          <CartItemsCount />
        </div>
        </Link>
        <div className="relative">
        <Link to="/favorite">
          <span className="truncate font-semibold text-md flex flex-col items-center text-center hover:scale-103">
            <AiOutlineHeart className="hover:opacity-100" size={27} />
            Favourite
          </span>
          {/* count favorite of user */}
          <FavoritesCount />
        </Link>
        </div>
      </div>
      {/* login and register */}
      {!userInfo && (
        <div className="flex gap-3">
          <Link
            className="px-3 py-2 text-white hover:opacity-85 bg-zinc-600 rounded-md font-semibold"
            to="/login"
          >
            LogIn
          </Link>

          <Link
            className="px-3 py-2 hover:opacity-85 text-white bg-zinc-600 rounded-md font-semibold"
            to="/register"
          >
            Register
          </Link>
        </div>
      )}

      {userInfo && (
        <div>
          <button
            onClick={() => {
              setUserDropedown(!userDropedown),
                setAdminDropdown(!adminDropdown);
            }}
            className="font-semibold md:text-md text-sm uppercase cursor-pointer hover:opacity-80"
          >
            {userInfo.username}'s Account
          </button>
          <div className="adminpopup">
            {/* admindropdown only for the admin */}
            <AnimatePresence initial={false}>
              {userInfo.isAdmin && adminDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ ease: "easeInOut", duration: 0.2 }}
                  className="bg-zinc-200 rounded-md text-md font-semibold list-none absolute px-10 py-10 top-21 right-20 flex flex-col  gap-5"
                  onClick={() => setAdminDropdown(false)}
                >
                  <li>
                    <Link
                      className="flex gap-3 hover:opacity-85 cursor-pointer"
                      to="/admin/dashbord"
                    >
                      <TbLayoutDashboardFilled size={25} /> Dashbord
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex gap-3 hover:opacity-85 cursor-pointer"
                      to="/admin/productlist"
                    >
                      <FaProductHunt size={25} /> Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex gap-3 hover:opacity-85 cursor-pointer"
                      to="/admin/categorylist"
                    >
                      <TbCategoryPlus size={25} /> Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex gap-3 hover:opacity-85 cursor-pointer"
                      to="/admin/orderlist"
                    >
                      <TbBorderSides size={25} /> Orders
                    </Link>
                  </li>
                  <button
                    className="flex gap-3 hover:opacity-85 cursor-pointer"
                    onClick={() => {
                      setAdminDropdown(false), logoutHandler();
                    }}
                  >
                    <BiLogOut size={25} />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* userdropdown only for user */}
      <AnimatePresence initial={false}>
        {userInfo && !userInfo.isAdmin && userDropedown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 right-10 px-7 py-10 bg-zinc-200 rounded-md"
            onClick={() => setUserDropedown(false)}
          >
            <div className="flex flex-col gap-6 font-semibold text-md">
              <Link className="flex gap-3 hover:opacity-85" to="/profile">
                <CgProfile size={25} /> Profile
              </Link>

              <button
                className="flex gap-3 hover:opacity-85 cursor-pointer"
                onClick={() => {
                  setUserDropedown(false), logoutHandler();
                }}
              >
                <BiLogOut size={25} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile view */}
      <div className="flex justify-around bg-zinc-700 w-full py-2 items-center gap-9 text-white text-center md:hidden fixed bottom-0 z-999">
       
        <Link to="/cart">
          <span className="truncate font-semibold text-md flex flex-col items-center justify-center text-center hover:scale-103">
            <AiOutlineShoppingCart className="hover:opacity-100" size={20} />
            Cart
          </span>
          {/* count cartItems in cart  */}
          <CartItemsCount />
        </Link>
        <Link to="/favorite">
          <span className="truncate font-semibold text-md flex flex-col items-center justify-center text-center hover:scale-103">
            <AiOutlineHeart className="hover:opacity-100" size={20} />
            Favourite
          </span>
          {/* count favorite of user */}
          <FavoritesCount />
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
