import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/category/CategoryForm";
import CategoryModel from "../../components/category/CategoryModel";

const CategoryList = () => {
  const { data: categories } = useGetAllCategoryQuery();
  const [name, setName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modelVisible, setModelVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handelCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created`);
      }
    } catch (error) {
      toast.error("Something wet wrong, try again.");
      console.log(error);
    }
  };

  const handelUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updateName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updateName,
        }}).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);        
        setUpdateName("");
        setModelVisible(false);
      }
    } catch (error) {
      toast.error("Something wet wrong, try again.2");
      console.log(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message || "Category deleted sucessfully");
        setModelVisible(false);
        setSelectedCategory(null);
      }
    } catch (error) {
      toast.error("Fail to delete category. Try again !");
      console.log(error);
    }
  };
  return (
    <div className="w-full absolute top-1/5 pl-10 pr-10">
      <div className="p-2">
        <h1 className="text-xl font-semibold ">Manage Category</h1>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handelCreateCategory}
        />
      </div>
      <div className="line w-full h-[2px] bg-zinc-700"></div>
      <br />
      <div className="flex flex-wrap">
        {categories?.map((category) => (
          <div key={category._id}>
            <button
              onClick={() => {
                setModelVisible(true),
                  setSelectedCategory(category),
                  setUpdateName(category.name);
              }}
              className="bg-zinc-800 text-white border-none rounded-md px-5 py-3 m-3 cursor-pointer hover:opacity-85 focus:outline-none"
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>
      <CategoryModel
        isOpen={modelVisible}
        onClose={() => setModelVisible(false)}
      >
        <CategoryForm
          value={updateName}
          setValue={setUpdateName}
          handleSubmit={handelUpdateCategory}
          buttonText="Update"
          handleDelete={handleDeleteCategory}
        />
      </CategoryModel>
      </div>
  );
};

export default CategoryList;
