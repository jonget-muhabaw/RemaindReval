import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { useUsers, useRoles, useUpdateUser } from "../../hooks/userAuth";
import CompanyLogo from "../../assets/logo.png";
import Spinner from "../../utils/Spinner";
import { showSnackbar } from "../../utils/ShowSnackbar"; 
import type { UpdateUserRequest } from "../../api/auth"; 

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const [selectedRole, setSelectedRole] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    password: "",
    role: "",
  });

  // Fetch all users to find the current user's data
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError,
  } = useUsers();

  const {
    data: roles = [],
    isLoading: isRolesLoading,
    isError: isRolesError,
    error: rolesError,
  } = useRoles();
  const { mutate: updateUserMutate, isPending: isUpdatePending } =
    useUpdateUser();

  useEffect(() => {
    if (id && usersData && roles.length > 0) {
      const currentUser = usersData.data.find((user) => user.id === id);
      if (currentUser) {
        setName(currentUser.name);
        setUsername(currentUser.username);
        setSelectedRole(currentUser.role?.name || "");
      } else {
        showSnackbar({ message: "User not found!", icon: "error" });
        navigate("/users");
      }
    }
  }, [id, usersData, roles, navigate]);

  // Validation function for update
  const validateForm = () => {
    let newErrors = { name: "", username: "", password: "", role: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Full Name is required.";
      isValid = false;
    }

    if (!username.trim()) {
      newErrors.username = "Email Address is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      newErrors.username = "Email Address is invalid.";
      isValid = false;
    }


    if (!selectedRole) {
      newErrors.role = "Please select a role.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!id) {
      showSnackbar({ message: "User ID not found for update.", icon: "error" });
      return;
    }

    const updateData: UpdateUserRequest = {
      name,
      username,
      roleName: selectedRole,
    };

   

    updateUserMutate(
      { id, data: updateData }, 
      {
        onSuccess: () => {
          navigate("/users");
          showSnackbar({
            message: "User updated successfully!",
            icon: "success",
          });
        },
        onError: (error: any) => {
          const status = error?.response?.status ?? null;
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "User update failed, please try again.";

          showSnackbar({
            message:
              status !== null && status >= 500
                ? "Server error, please try later"
                : message,
            icon: status !== null && status >= 500 ? "error" : "warning",
            position: "top-end",
            duration: 4000,
          });
        },
      }
    );
  };

  if (isUsersLoading || isRolesLoading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  if (isUsersError || isRolesError) {
    return (
      <div className="p-4 text-red-500 text-center min-h-screen flex items-center justify-center">
        Error loading data: {usersError?.message || rolesError?.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-md md:max-w-lg bg-white border border-gray-200 p-6 sm:p-8 rounded-lg shadow">
        <div className="flex justify-center mb-6">
          <img src={CompanyLogo} alt="Company Logo" className="w-36 h-auto" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="font-medium text-primary text-xl sm:text-2xl md:text-3xl mt-3 text-center">
            Edit User
          </h1>
          <div>
            <label className="block text-gray-900 text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              className={`bg-gray-50 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors({ ...errors, name: "" });
              }}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-900 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              className={`bg-gray-50 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors({ ...errors, username: "" });
              }}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
       
          <div>
            <label className="block text-gray-900 text-sm font-medium mb-2">
              Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setErrors({ ...errors, role: "" });
              }}
              className={`bg-gray-50 border ${
                errors.role ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
            >
              <option value="" disabled>
                Select a role
              </option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={isUpdatePending}
          >
            {isUpdatePending ? <Spinner size="large" /> : "Update User"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="w-full text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
