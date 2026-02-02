import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SerchProduct = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => { 
    e.preventDefault();

    navigate(`/search?keyword=${keyword}`); 
  };
  return (
    <>
      <form className="flex items-center justify-center" onSubmit={submitHandler}>
        <input
          className="md:w-[30vw] w-1/2 px-7 truncate bg-white py-2 font-semibold rounded-md border-[1px] border-zinc-200 rounded-r-none"
          type="text"
          placeholder="Search in store"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          type="submit"
          className="px-2  text-md md:px-3 py-2 rounded-md cursor-pointer bg-zinc-400 rounded-l-none  hover:opacity-70"
        >
          <AiOutlineSearch size={24} />
        </button>
      </form>
    </>
  );
};

export default SerchProduct;
