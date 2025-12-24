import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
//rtk store
import store from "./redux/store.js";

//auth
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Profile from "./pages/User/Profile.jsx";
import UserProctedRoute from "./components/procted-routes/UserProctedRoute.jsx";
import AdminProtectedRoute from "./components/procted-routes/AdminProtectedRoute.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";
import ProductPage from "./pages/Products/ProductPage.jsx";
import FavoritePage from "./pages/Products/FavoritePage.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}> 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<ProductPage />} />
      <Route path="/favorite" element={<FavoritePage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      {/* <Route path="/shipping" element={<ProductShipping />} /> */}

  {/* User protected route */}
    <Route path="" element={<UserProctedRoute />}>
      <Route path="/profile" element={<Profile />} />
     </Route>

    {/* Admin protected routes */}
    <Route path="/admin" element={<AdminProtectedRoute />}>
    <Route path="categorylist" element={<CategoryList />} />
    <Route path="productlist" element={<ProductList />} />
    <Route path="allproductlist" element={<AllProducts />} />
    <Route path="product/update/:_id" element={<UpdateProduct />} />
    </Route>


  </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
