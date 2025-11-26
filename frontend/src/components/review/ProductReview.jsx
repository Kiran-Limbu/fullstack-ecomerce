import { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../product/Rating";
import { useGetTopProductQuery } from "../../redux/api/productApiSlice";
import { ClipLoader } from "react-spinners";
import moment from "moment";


const ProductReview = ({
  loadingProductRewiew,
  submitHandler,
  userInfo,
  rating,
  setRating,
  setComment,
  comment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center pt-[20vw] h-screen w-full opacity-80">
        <ClipLoader size={70} />
      </div>
    );
  }

  return (
    <div className="pt-9 text-white">
      <div className="px-15">
        <h1 className="text-3xl font-semibold">Put You Rewiews</h1>
      </div>
      <div className="flex px-5 flex-col">
        {userInfo ? (
          <form onSubmit={submitHandler}>
            <div className="px-3">
              <lable
                htmlfor="rating"
                className="font-semibold text-2xl block text-md py-3"
              >
                Rating :
              </lable>
              <select
                id="rating"
                required
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="px-5 py-3 w-full border rounded-md text-black"
              >
                <option value="">Select</option>
                <option value="1">Poor</option>
                <option value="2">Decent</option>
                <option value="3">Good</option>
                <option value="4">Very Good</option>
                <option value="5">Excellent</option>
              </select>
            </div>
            <div className="py-5 px-3">
              <lable
                htmlFor="comment"
                className="font-semibold text-2xl block text-md py-3"
              >
                Comment :
              </lable>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="px-5 py-3 w-full border rounded-md text-white"
              ></textarea>
            </div>
            <div className="px-3 py-3">
              <button
                type="submit"
                disabled={loadingProductRewiew}
                className="px-5 py-3 rounded-md bg-zinc-600 text-xl font-semibold hover:opacity-80 cursor-pointer transition-all"
              > Submit
              </button>
            </div>
          </form>
        ) : (
          <p className="font-semibold text-xl">
            Please
            <Link className="text-pink-500" to="/login">
              singIn
            </Link>
            to add your review
          </p>
        )}
      </div>

      {/* render all reviews */}
      <div className="">
        <div className="px-15 py-8">
        <h1 className="text-3xl font-semibold">All Reviews :</h1>
        </div>
        <div className="flex justify-center items-center">
        { product.reviews.length === 0 && (<p className="text-2xl font-semibold text-red-600">No Reviews</p>)}
        {product.reviews.map((review) =>(
          <div key={review._id} className="border-none rounded-md px-5 bg-zinc-900 w-full mx-6 flex flex-col gap-3 py-5"> 
            <div className="flex justify-between items-center">
              <h1 className="text-xl">{review.name}</h1>
              <p className="text-xl">{moment(review.createdAt).format("MMM D YYYY")}</p>
            </div>
            <div className="flex flex-col gap-3">
              <p>
              {review.comment}
              </p>
              <div>
                <Rating value={rating} />
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
