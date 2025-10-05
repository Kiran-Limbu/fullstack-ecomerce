import { motion, AnimatePresence } from "motion/react";
import { RxCross1 } from "react-icons/rx";

const CategoryModel = ({ isOpen, onClose, children }) => {
  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: [0.33, 1, 0.68, 1] }}
            className="fixed inset-0 flex items-center justify-center"
          >
            <div className="fixed inset-0 bg-zinc-800 opacity-95 z-[999]">
              <div className="absolute top-1/3 right-[40vw] z-[999] bg-white p-3 rounded-xl flex justify-end items-end flex-col">
                <button
                  onClick={onClose}
                  className="hover:text-zinc-700 font-semibold cursor-pointer"
                >
                  <RxCross1 size={20} />
                </button>
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryModel;
