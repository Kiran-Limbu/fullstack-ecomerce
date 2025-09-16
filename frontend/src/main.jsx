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
import ProctedRoute from "./components/ProctedRoute.jsx";
import Profile from "./pages/User/Profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<App />}> 

  {/* protectedRoute */}
    <Route path="" element={<ProctedRoute />}>
      <Route path="/profile" element={<Profile />} />
     </Route>

  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
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
