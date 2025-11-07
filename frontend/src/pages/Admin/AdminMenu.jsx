import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "motion/react";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed">
      <button
        className="pt-2 px-3 py-2 my-4 mx-2 bg-zinc-500 rounded-md cursor-pointer"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes size={20} />
        ) : (
          <>
            <GiHamburgerMenu size={20} />
          </>
        )}
      </button>
      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
          >
            <section className="bg-zinc-400 p-3 fixed right-2 rounded-md">
              <ul className="list-none font-semibold">
                <li>
                  <NavLink
                    className="list-item py-2 px-3  hover:bg-zinc-300 rounded-md"
                    to="/admin/dashboard"
                  >
                    Admin Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="list-item py-2 px-3  hover:bg-zinc-300 rounded-md"
                    to="/admin/categorylist"
                  >
                    Create Category
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="list-item py-2 px-3  hover:bg-zinc-300 rounded-md"
                    to="/admin/productlist"
                  >
                    Create Product
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="list-item py-2 px-3  hover:bg-zinc-300 rounded-md"
                    to="/admin/allproductlist"
                  >
                    All Product
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="list-item py-2 px-3  hover:bg-zinc-300 rounded-md"
                    to="/admin/userlist"
                  >
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="list-item py-2 px-3  hover:bg-zinc-300 rounded-md"
                    to="/admin/orderlist"
                  >
                    Manage Order
                  </NavLink>
                </li>
              </ul>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminMenu;
