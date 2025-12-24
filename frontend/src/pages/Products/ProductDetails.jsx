import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../../redux/api/productApiSlice";
import { ClipLoader } from "react-spinners";
import moment from "moment";
import HeartIcon from "../../components/product/HeartIcon";
import { IoIosStar } from "react-icons/io";
import { MdBrandingWatermark } from "react-icons/md";
import { PiClockCountdownFill } from "react-icons/pi";
import { RiTimeFill } from "react-icons/ri";
import Rating from "../../components/product/Rating";
import ProductReview from "../../components/review/ProductReview";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductRewiew }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({...product, qty}))
    navigate("/cart");
  };

   const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId, rating, comment
      }).unwrap();
      
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Product already reviewed");
    }
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center pt-[20vw] h-screen w-full opacity-80">
        <ClipLoader size={70} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center pt-[20vw] md:text-3xl text-lg text-red-500">
        ERROR ! Something went wrong
      </div>
    );
  }
  return (
    <>
      <div className="pt-5 px-5 text-white">
        <Link
          className="px-4 py-3 bg-zinc-500 text-xl font-semibold rounded-md"
          to="/"
        >
          Go Back
        </Link>
      </div>
      <div className="px-5 py-7 flex  flex-col md:flex-row gap-9 text-white">
        <div className="md:w-1/2 w-full relative">
          <img
            className="object-cover overflow-hidden md:w-[50vw] w-full h-[50vh] rounded-md"
            src={product.image}
            alt={product.name}
          />
          <div className="absolute z-[999] top-[-2vh] right-1/14 ">
            <HeartIcon product={product} />
          </div>
        </div>
        <div className="flex flex-col gap-5 md:w-1/2 w-full">
          <h1 className="font-semibold text-3xl capitalize">{product.name}</h1>
          <ul className="list-none flex flex-col gap-3  font-semibold text-xl">
            <li className="flex items-center gap-2">
              <IoIosStar />
              Rating : {product.rating}
            </li>
            <li>$ {product.price.toFixed(2)}</li>
            <li className="flex items-center gap-2">
              <MdBrandingWatermark />
              Brand: {product.brand}
            </li>
            <li className="flex items-center gap-2">
              <PiClockCountdownFill />
              CountInStock: {product.countInStock}
            </li>
            <li className="flex items-center gap-2">
              <RiTimeFill />
              Added : {moment(product.createdAt).format("MMM D YYYY")}
            </li>
            <li>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </li>
          </ul>
          <p>{product.description}</p>

          <div className="flex gap-7 items-center pt-3">
            {product.countInStock > 0 && (
              <div>
                <select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="text-black px-5 py-3 rounded-md border"
                >
                  {[...Array(product.countInStock).keys()].map((pro) => (
                    <option key={pro + 1} value={pro + 1}>
                      {pro + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <button
                className="px-7 py-3 rounded-md bg-zinc-500 font-semibold text-xl hover:opacity-80 cursor-pointer transition-all"
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="rewiew">
        <ProductReview
          loadingProductRewiew={loadingProductRewiew}
          userInfo={userInfo}
          submitHandler={submitHandler}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          product={product}
        />
      </div>
    </>
  );
};

export default ProductDetails;
