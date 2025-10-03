import { motion } from "motion/react";

const CategoryModel = ({isOpen , onClose, children}) => {
  return (
    <div>
      {isOpen && (
        <motion.div className="div">

        </motion.div>
      )}
    </div>
  )
}

export default CategoryModel
