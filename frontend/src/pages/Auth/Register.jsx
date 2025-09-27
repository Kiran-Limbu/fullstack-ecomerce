import { useState, useEffect } from "react";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // state for password hide and show
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);
  const redirect = searchParam.get("redirect") || "/";

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredientials({ ...res }));
        navigate(redirect);
        toast.success("Register User Successful");
      } catch (error) {
        toast.error(error?.data?.message || error.massage);
      }
    }
  };
  return (
    <div
      ition={{ ease: "easeInOut", duration: 0.3 }}
      className="fixed top-23 shadow-2xl rounded-md left-0 md:left-1/4 w-full md:w-1/2"
    >
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="flex flex-col justify-center gap-3 py-3 px-5">
          <h1 className="md:text-2xl text:md font-semibold text-center">
            Register As a User
          </h1>

          <div>
            <label htmlFor="name" className="block text-md font-semibold mb-2">
              User Name
            </label>
            <input
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="border-[2px] w-full border-zinc-400 px-5 py-2.5 rounded-md focus:border-blue-600 focus:outline-none placeholder:text-sm "
              type="text"
              id="name"
              required
              placeholder="Enter user name"
            />
          </div>
          <div>
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
          <div>
            <label
              htmlFor="passwword"
              className="block text-md font-semibold mb-2"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" border-[2px] w-full border-zinc-400 px-5 py-2.5 rounded-md focus:border-blue-600 focus:outline-none placeholder:text-sm "
              type={showPassword ? "text" : "password"}
              id="password"
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="relative">
            <label htmlFor="name" className="block text-md font-semibold mb-2">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className=" border-[2px] w-full border-zinc-400 px-5 py-2.5 rounded-md focus:border-blue-600 focus:outline-none placeholder:text-sm "
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              required
              placeholder="Enter confirm password"
            />
            {/* Eye button to show and hide pass */}
            <button
              className="absolute top-11 right-23 cursor-pointer"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <RxEyeOpen size={21} />
              ) : (
                <RxEyeClosed size={21} />
              )}
            </button>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-2.5 flex items-center justify-center bg-zinc-700 rounded-md cursor-pointer hover:opacity-85 font-bold text-lg text-white"
          >
            {isLoading ? <ClipLoader size={33} /> : "SIGN UP"}
          </button>
          <div className="font-semibold p-[2px]">
            <span>
              Allready have an account?&nbsp;
              <Link to="/login" className="text-blue-500">
                LogIn
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
