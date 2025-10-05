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
          id="value"
          className="px-5 py-3 border rounded-md w-full"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex items-center gap-5 pt-5 text-white">
          <button className="bg-zinc-700 px-5 cursor-pointer py-3 rounded-md hover:opacity-85 focus:outline-none focus:ring-zinc-700">
            {buttonText}
          </button>

        {handleDelete && (
          <button
          type="button"
          onClick={handleDelete}
          className="px-5 py-3 bg-red-700 rounded-md hover:opacity-85 cursor-pointer focus:outline-none text-white">Delete</button>
        )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
