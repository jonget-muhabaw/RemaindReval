import React from "react";
import { useUsers, useDeleteUser } from "../../hooks/userAuth"; 
import type { Datum } from "../../types/user";
import { Link, useNavigate } from "react-router-dom"; 
import { FaEdit, FaTrash } from "react-icons/fa";
import { showSnackbar } from "../../utils/ShowSnackbar";

const Users: React.FC = () => {
  const { data, isLoading, isError, error } = useUsers();
  const { mutate: deleteUserMutation } = useDeleteUser(); 
  const navigate = useNavigate();
  

  const handleEdit = (id: string) => {
    console.log("Edit user with ID:", id);
  
    navigate(`/update-user/${id}`);
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      deleteUserMutation(id, {
        onSuccess: () => {
          showSnackbar({
            message: "User deleted successfully!",
            icon: "success",
          });
        },
        onError: (err: any) => {
          const message =
            err?.response?.data?.message || "Failed to delete user.";
          showSnackbar({
            message,
            icon: "error",
          });
        },
      });
    }
  };

  if (isLoading) return <div className="p-4">Loading users...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Users</h2>
        <Link to="/signup">
          <button className="bg-primary hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
            + Add User
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-6 py-3 font-semibold tracking-wide">Name</th>
              <th className="px-6 py-3 font-semibold tracking-wide">Email</th>
              <th className="px-6 py-3 font-semibold tracking-wide">Role</th>
              <th className="px-6 py-3 font-semibold tracking-wide text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((user: Datum) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.username}</td>
                <td className="px-6 py-3">{user.role?.name || "-"}</td>
                <td className="px-6 py-3 text-center">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
