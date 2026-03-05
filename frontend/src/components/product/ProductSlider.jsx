import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetTopProductQuery } from "../../redux/api/productApiSlice";
import moment from "moment";
import { Link } from "react-router-dom";

const ProductSlider = () => {
  const { data: topProductData } = useGetTopProductQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
  };

  return (
    <div className="px-2 md:px-8 md:pt-6 pt-17">
      <style>
        {`
      .slick-dots li button:before {
        color: white !important;
        opacity: 99;
        font-size: 10px;
        border: none;
      }
      .slick-dots li.slick-active button:before {
        color: black !important;
      }
    `}
      </style>
      <Slider {...settings}>
        {topProductData?.map((product) => (
          <div key={product._id}>
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="h-1/2 w-full object-cover rounded-md overflow-hidden"
              />
              <div className="grid grid-cols-3 justify-items-center-safe py-3">
                <div className="flex flex-col gap-3">
                  <ul>
                    <li className="capitalize">{product.name}</li>
                    <li>$ {product.actualPrice.toFixed(2)}</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <ul className="list-none">
                    <li>Brand : {product.brand}</li>
                    <li>
                      Added : {moment(product.createdAt).format("MMM D YYYY")}
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <ul className="list-none">
                    <li>Rating : {product.rating}</li>
                    <li>Reviews : {product.numReviews}</li>
                  </ul>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
