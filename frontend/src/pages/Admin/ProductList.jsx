import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useGetAllCategoryQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";


const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useGetAllCategoryQuery();

  const handelSubmit = async(e) =>{
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

     const { data } = await createProduct(productData);

     if(data.error){
      toast.error("Product create failed. Try Again");
     }else {
      toast.success(`${data.name} is created`);
      navigate("/");
     }

    } catch (error) {
      toast.error("Product create failed. Try Again" || error.error);
    }

  };

  const uploadFileHandler = async (e) =>{
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }

  };

 
  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col">
        <div className="flex justify-end">
        <AdminMenu />
        </div>
        <div className="px-7 py-5">
          <h1 className="md:text-3xl capitalize text-2xl font-semibold">Create Product :</h1>
        </div>
        {imageUrl && (
          <div className="text-center">
            <img
              src={imageUrl}
              alt="product"
              className="object-cover w-1/2 h-[50vh] mx-auto overflow-hidden rounded-md"
            />
          </div>
        )}

        <div className="flex justify-center items-center">
          <label className="border-[1.5px] bg-zinc-200 hover:bg-zinc-300 px-9 block md:w-[60vw] w-full text-center rounded-md cursor-pointer font-semibold py-9">
            {image ? image.name : "Upload Image : "}

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className={!image ? "hidden" : "text-black"}
            />
          </label>
        </div>

        <div className="px-10 py-4 w-full">
          <div className="flex flex-wrap justify-around px-3 py-2">
            <div>
              <label htmlFor="name"> Name </label>
              <input
                type="text"
                className="py-3 px-2 border rounded-md block bg-zinc-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name"> Price </label>
              <input
                type="number"
                className="py-3 px-2 border rounded-md block bg-zinc-300"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-around px-3 py-2">
            <div>
              <label htmlFor="name"> Quantity </label>
              <input
                type="number"
                className="py-3 px-2 border rounded-md block bg-zinc-300"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name"> Brand </label>
              <input
                type="text"
                className="py-3 px-2 border rounded-md block bg-zinc-300"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>
          <div className="text-center">
            <label className="my-2 block" htmlFor="name">
              Description
            </label>
            <textarea
              type="text"
              className="py-3 px-3 bg-zinc-300 border rounded-md w-1/2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-around">
            <div>
              <label htmlFor="name"> Count In Stock</label>
              <input
                type="number"
                className="block py-3 px-2 md:w-[10vw] w-[15vw] border rounded-md bg-zinc-300"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name">Category</label>
              <select
                className="block py-3 px-2 md:w-[10vw] w-[15vw] border rounded-md bg-zinc-300"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((category) => (
                  <option key={category._id} value={category._id} >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-center my-6">
            <button
              className="py-3 w-[25vw] cursor-pointer rounded-md bg-zinc-600 hover:opacity-95 font-semibold md:text-lg text-md"
              onClick={handelSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
