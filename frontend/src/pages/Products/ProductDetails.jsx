import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../../redux/api/productApiSlice";
import { ClipLoader } from "react-spinners";
import moment from "moment";
import HeartIcon from "../../components/product/HeartIcon";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data, isLoading, isError, refetch } =
    useGetProductDetailsQuery(productId);

    const {userInfo} = useSelector(state => state.auth);

    const [createReview, {isLoading: loadingProductRewiew}] = useCreateReviewMutation();

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
  return <div>product details page</div>;
};

export default ProductDetails;
