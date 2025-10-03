import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice.js";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure ???")) {
      try {
        await deleteUser(id);
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });

      setEditableUserId(null);
      refetch();
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  return (
    <div className="p-5 relative top-30">
      <h1 className="md:text-3xl text-lg font-semibold">Users</h1>

      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <ClipLoader size={70} />
        </div>
      ) : (
        <div className="px-5 py-3">
          <table className="w-full px-3 py-5">
            <thead>
              <tr>
                <th className="font-semibold text-md md:text-xl text-left">
                  ID
                </th>
                <th className="font-semibold text-md md:text-xl text-left">
                  NAME
                </th>
                <th className="font-semibold text-md md:text-xl text-left">
                  EMAIL
                </th>
                <th className="font-semibold text-md md:text-xl text-left">
                  ADMIN
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td className="px-5 py-3 text-green-800 ">{user._id}</td>
                  <td className="px-5 py-3 text-green-800">
                    {editableUserId === user._id ? (
                      <div className="flex items-center gap-[30px]">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="w-full p-3 border-[2px] rounded-md"
                        />
                        <button
                          className="px-4 py-3 bg-zinc-700 hover:opacity-85 rounded-md"
                          onClick={() => updateHandler(user._id)}
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        {user.username}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3 text-green-800">
                    {editableUserId === user._id ? (
                      <div className="flex items-center gap-[30px]">
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="w-full p-3 border-[2px] rounded-md"
                        />
                        <button
                          className="px-4 py-3 bg-zinc-700 hover:opacity-85 rounded-md"
                          onClick={() => updateHandler(user._id)}
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <p>{user.email}</p>
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        ></button>
                        <FaEdit />
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-3 text-green-800">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>

                  <td className="px-5 py-3">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="px-4 py-3 bg-red-700 hover:opacity-85 hover:text-stone-50 font-semibold rounded-md"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {error && (
            <div className="text-3xl text-center pt-10 text-red-800 font-semibold">
              Something went wrong
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;
