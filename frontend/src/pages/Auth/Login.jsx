import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // state for password hide and show
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);
  const redirect = searchParam.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredientials({ ...res }));
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="fixed top-23 shadow-2xl rounded-md left-0 md:left-1/4 w-full md:w-1/2">
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="flex flex-col justify-center gap-5 py-5 px-6 ">
          <h1 className="md:text-2xl text:md font-semibold text-center">
            LogIn As a User
          </h1>
          <div className="div">
            <label htmlFor="email" className="block text-md font-semibold mb-2">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[2px] w-full border-zinc-400 px-5 py-2.5 rounded-md focus:border-blue-600 focus:outline-none placeholder:text-sm"
              type="email"
              id="email"
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="div">
            <label
              htmlFor="passwword"
              className="block text-md font-semibold mb-2">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" border-[2px] w-full border-zinc-400 px-5 py-2.5 rounded-md focus:border-blue-600 focus:outline-none placeholder:text-sm "
              type={ showPassword ? "text" : "password" }
              id="password"
              required
              placeholder="Enter your password"
            />
          </div>
          {/* Eye button to show and hide pass */}
          <button
            className="absolute top-[56%] right-[15%] cursor-pointer"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <RxEyeOpen size={21} /> : <RxEyeClosed size={21} />}
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-2.5 flex items-center justify-center bg-zinc-700 rounded-md cursor-pointer hover:opacity-85 font-bold text-lg text-white"
          >
            {isLoading ? <ClipLoader size={33} /> : "LOGIN"}
          </button>
          <div className="font-semibold p-[2px]">
            <span>
              Don't have an account? &nbsp;
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
