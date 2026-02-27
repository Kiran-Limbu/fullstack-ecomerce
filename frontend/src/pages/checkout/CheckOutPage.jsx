// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { ClipLoader } from "react-spinners";
// import { toast } from "react-toastify";

// const CheckOutPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);
//   console.log(cart);

  
  
//   return (
//     <div className="p-7">
//       {cart.cartItems.length === 0 ? (
//         <p className="text-2xl font-semibold text-red-600">No Reviews</p>
//       ) : (
//         <>
//           <div className="w-full flex flex-col justify-center gap-5 text-white">
//             {cart.cartItems.map((data) => (
//               <div
//                 className="grid grid-cols-2 items-center py-1/2 px-1/2"
//                 key={data._id}
//               >
//                 <div className="flex items-center gap-5 overflow-hidden">
//                   <img
//                     className="h-50 object-cover w-50 overflow-hidden rounded-md"
//                     src={data.image}
//                     alt={data.name}
//                   />
//                   <Link
//                     className="font-semibold text-xl capitalize"
//                     to={`/product/${data._id}`}
//                   >
//                     {data.name}
//                   </Link>
//                 </div>

//                 <div className="price">
//                   <span className="font-semibold text-red-500">
//                     ${data.price.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             ))}
//             <div className="flex justify-around pt-5 font-semibold text-xl">
//               Shipping Price :{" "}
//               <span className="text-red-500"> $ {cart.shippingPrice}</span>
//             </div>
//             <div className="line w-full h-[1.3px] shadow-xs shadow-blue-600 bg-zinc-500"></div>

//             <div className="flex justify-around pt-5 font-semibold text-xl">
//               Tax Price :{" "}
//               <span className="text-red-500"> $ {cart.taxPrice}</span>
//             </div>
//             <div className="line w-full h-[1.3px] bg-zinc-500 shadow-xs shadow-blue-600"></div>

//             <div className="flex justify-around pt-5 font-semibold text-xl">
//               Total Price :{" "}
//               <span className="text-red-500"> $ {cart.taxPrice}</span>
//             </div>

//             <div className="line w-full h-[1.3px] bg-zinc-500 shadow-xs shadow-blue-600"></div>

//             <div className="flex justify-center pt-5 ">
//               <button
//                 type="button"
//                 className="bg-zinc-500 py-3 w-1/2 rounded-md font-semibold text-xl cursor-pointer hover:opacity-80"
//                 disabled={cart.cartItems === 0}
//                 onClick={placeOrderHandle}
//               >
//                 Place Order
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CheckOutPage;
