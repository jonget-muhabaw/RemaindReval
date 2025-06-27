import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup, useRoles } from "../../hooks/userAuth";
import CompanyLogo from "../../assets/logo.png";
import Spinner from "../../utils/Spinner";
import { showSnackbar } from "../../utils/ShowSnackbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const { mutate: signupMutate, isPending: isSignupPending } = useSignup();
  const { data: roles, isLoading, isError, error } = useRoles();

  const validateFields = () => {
    const newErrors = {
      name: name.trim() === "" ? "Full Name is." : "",
      username: username.trim() === "" ? "Email Address is." : "",
      password:
        password.length < 6 ? "Password must be at least 6 characters." : "",
      role: selectedRole === "" ? "Please select a role." : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    signupMutate(
      { name, username, password, roleName: selectedRole },
      {
        onSuccess: () => {
          navigate("/dashboard");
          showSnackbar({ message: "Signup successful", icon: "success" });
        },
        onError: (error: any) => {
          const status = error?.response?.status || null;
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Signup failed, please try again.";

          showSnackbar({
            message: status >= 500 ? "Server error, please try later" : message,
            icon: status >= 500 ? "error" : "warning",
            position: "top-end",
            duration: 4000,
          });
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-md md:max-w-lg bg-white border border-gray-200 p-6 sm:p-8 rounded-lg shadow">
        <div className="flex justify-center mb-6">
          <img src={CompanyLogo} alt="Company Logo" className="w-36 h-auto" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="font-medium text-gray-900 text-xl sm:text-2xl md:text-3xl mt-3 text-center">
            Create User
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
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div className="relative">
            <label className="block text-gray-900 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="••••••••"
              className={`bg-gray-50 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-300 block w-full p-2.5`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Toggle Button */}
            <button
              type="button"
              className="absolute inset-y-0 right-3 mt-6 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500 hover:text-gray-700" />
              ) : (
                <FaEye className="text-gray-500 hover:text-gray-700" />
              )}
            </button>
          </div>
          <div>
            <label className="block text-gray-900 text-sm font-medium mb-2">
              Role
            </label>
            {isLoading ? (
              <Spinner size="small" />
            ) : isError ? (
              <div className="text-red-500 text-sm">
                Failed to load roles: {error.message}
              </div>
            ) : (
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className={`bg-gray-50 border ${
                  errors.role ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              >
                <option value="" disabled>
                  Select a role
                </option>
                {roles?.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            )}
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isSignupPending ? <Spinner size="large" /> : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
