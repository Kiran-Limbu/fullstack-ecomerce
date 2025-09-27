import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { GrUpdate } from "react-icons/gr";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const submitHandler = async (e) => {
    setPassword("");
    setConfirmPassword("");
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredientials({ ...res }));
        toast.success("User profile updated successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="w-full opacity-85 ">
      <div className="fixed top-25 left-0 md:left-[25%] w-full md:w-1/2 px-5 py-6 rounded-md">
        {/* heading tag */}
        <div className="md:text-2xl text-md font-semibold pb-4 text-green-400">
          <h1 className="flex items-center gap-5">
            Update User <GrUpdate size={29} />
          </h1>
        </div>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="mt-3">
            <label htmlFor="user" className="block text-md font-semibold">
              User Name
            </label>
            <input
              type="text"
              id="user"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="px-5 py-2.5 border-zinc-400 border-[2px] rounded-md w-full focus:border-sky-500"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="email" className="block text-md font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="px-5 py-2.5 border-zinc-400 border-[2px] rounded-md w-full focus:border-sky-500"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="password" className="block text-md font-semibold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="px-5 py-2.5 border-zinc-400 border-[2px] rounded-md w-full focus:border-sky-500"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="user" className="block text-md font-semibold">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter confirm password"
              className="px-5 py-2.5 border-zinc-400 border-[2px] rounded-md w-full focus:border-sky-500"
            />
          </div>
          {/* order and update btn */}
          <div className="mt-3 flex justify-between">
            <button
              type="submit"
              className="px-5 py-3 text-white font-semibold rounded-md cursor-pointer hover:opacity-95 bg-zinc-800"
            >
              {loadingUpdateProfile ? <ClipLoader size={19} /> : "Update"}
            </button>
            <Link
              to="/user-order"
              className="px-5 py-3 text-white font-semibold rounded-md hover:opacity-95 bg-zinc-800"
            >
              Order
            </Link>
          </div>
        </form>

        {/* eye button for hide and show pass */}
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-93 right-1/6"
        >
          {showPassword ? <RxEyeOpen size={21} /> : <RxEyeClosed size={21} />}
        </button>
      </div>
    </div>
  );
};

export default Profile;
