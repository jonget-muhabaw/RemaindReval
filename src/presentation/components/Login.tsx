import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLogin } from "../../hooks/userAuth";
import logo from "../../assets/logo.png";
import Spinner from "../../utils/Spinner";
import { showSnackbar } from "../../utils/ShowSnackbar";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();

  const validate = (): boolean => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
      newErrors.username = "Invalid email address.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    mutate(
      { username, password },
      {
        onSuccess: () => {
          navigate("/dashboard");
          // showSnackbar({ message: "Login successful", icon: "success" });
        },
        onError: (error: any) => {
          const status = error?.response?.status || null;
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Login failed, please try again.";

          if (status === 401) {
            showSnackbar({
              message: "Unauthorized: Invalid username or password",
              icon: "error",
              position: "top-end",
              duration: 4000,
            });
          } else if (status >= 500) {
            showSnackbar({
              message: "Server error, please try later",
              icon: "error",
              position: "top-end",
              duration: 4000,
            });
          } else {
            showSnackbar({
              message,
              icon: "warning",
              position: "top-end",
              duration: 4000,
            });
          }
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
      <img
        src={logo}
        height={300}
        width={400}
        alt="company logo"
        className="mb-6"
      />
      <div className="w-full max-w-md md:max-w-lg bg-white border border-gray-200 p-6 sm:p-8 rounded-lg shadow">
        <form action="#" onSubmit={handleSubmit} className="space-y-6">
          <h1 className="font-medium text-gray-900 text-xl sm:text-2xl md:text-3xl mt-3 text-center">
            Login to RavalRemainder
          </h1>
          <div>
            <label className="block text-gray-900 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`bg-gray-50 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-300 block w-full p-2.5`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
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
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" }); 
              }}
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isPending ? <Spinner size="large" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
