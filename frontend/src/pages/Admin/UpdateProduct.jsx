import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useGetAllCategoryQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const UpdateProduct = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState(productData?.name || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || "");

  const navigate = useNavigate();

  const { data: categories = [] } = useGetAllCategoryQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData?.category);
      setBrand(productData.brand);
      setStock(productData.countInStock);
      setQuantity(productData.quantity);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added sucessfully");
      setImage(res.image);
      setImage(res.image);
    } catch (error) {
      toast.error(data?.error?.meaasge || "Somethig went wrong");
    }
  };

  const handelUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("brand", brand);
    formData.append("countInStock", stock);
    try {
      const { data } = await updateProduct({ productId: params._id, formData });

      if (data.error) {
        toast.error(data?.error?.message || data.error);
      } else {
        toast.success("Product sucessfully updated");
        navigate("/admin/allproductlist");
      }
    } catch (error) {
      toast.error(
        error?.data?.message || "Product updated failed !. Try Again"
      );
    }
  };

  const handelDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure ! You want to delete this product"
      );

      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(data?.message);
      navigate("/admin/allproductlist");
    } catch (error) {
      toast.error(error?.error || "Something went wrong");
    }
  };

  

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col">
        <div className="flex justify-end">
          <AdminMenu />
        </div>
        <div className="px-7 py-5">
          <h1 className="md:text-3xl text-green-500 capitalize text-2xl font-semibold">
            Update or Delete Product :
          </h1>
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
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-around items-center my-6">
            <button
              className="py-3 w-[25vw] cursor-pointer rounded-md bg-green-500 hover:opacity-95 font-semibold md:text-lg text-md"
              onClick={handelUpdate}
            >
              Update
            </button>
            <button
              className="py-3 w-[25vw] cursor-pointer rounded-md bg-red-500 hover:opacity-95 font-semibold md:text-lg text-md"
              onClick={handelDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
