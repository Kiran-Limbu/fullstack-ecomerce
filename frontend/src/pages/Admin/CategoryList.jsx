import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/category/CategoryForm";

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

    if(!name) {
      toast.error('Category name is required')
    }

    try {
      const result = await createCategory({name}).unwrap();
      if(result.error){
        toast.error(result.error);
      } else{
        setName("")
        toast.success(`${result.name} is created`);
      }

    } catch (error) {
      toast.error('Something wet wrong, try again.')
      console.log(error)
    }
  }

  return (
    <div className="w-full absolute top-1/5 pl-10 pr-10">
      <div className="p-2">
        <h1 className="text-xl font-semibold ">Manage Category</h1>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handelCreateCategory }
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
    </div>
  );
};

export default CategoryList;
