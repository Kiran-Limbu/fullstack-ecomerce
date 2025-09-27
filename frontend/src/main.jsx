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
import UserList from "./pages/Admin/UserList.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}> 
    
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

  {/*User protected route */}
    <Route path="" element={<UserProctedRoute />}>
      <Route path="/profile" element={<Profile />} />
     </Route>

    {/* Admin protected routes */}
    <Route path="/admin" element={<AdminProtectedRoute />}>
    <Route path="userlist" element={<UserList />} />
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
