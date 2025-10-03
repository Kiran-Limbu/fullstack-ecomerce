const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-4 font-semibold">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="px-5 py-3 border rounded-md md:w-1/2 w-full"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-between pt-5 text-white">
          <button className="bg-zinc-700 px-5 cursor-pointer py-3 rounded-md hover:opacity-85 focus:outline-none focus:ring-zinc-700">
            {buttonText}
          </button>
        </div>

        {handleDelete && (
          <button
          onClick={handleDelete}
          className="px-5 py-3 bg-red-700 rounded-md hover:opacity-85 cursor-pointer focus:outline-none focus:ring-2 focus:bg-red-700 text-white">Delete</button>
        )}
      </form>
    </div>
  );
};

export default CategoryForm;
