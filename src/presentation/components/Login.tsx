import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../../hooks/userAuth";
import logo from "../../assets/logo.png";
import Spinner from "../../utils/Spinner";
import { showSnackbar } from "../../utils/ShowSnackbar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { username, password },
      {
        onSuccess: () => {
          navigate("/dashboard");
          showSnackbar({ message: "Login successful", icon: "success" });
        },
        onError: (error: any) => {
          // Extract status code and message, adjust this according to your API error shape
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
      {/* Company Logo */}
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:primary focus:secondary block w-full p-2.5"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:primary focus:secondary block w-full p-2.5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
              />
              <label className="ml-2 text-sm font-medium text-gray-900">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isPending ? <Spinner size="large" /> : "Login"}
          </button>

          <div className="flex justify-center mt-6">
            <button className="flex items-center justify-center w-full bg-white border border-gray-300 text-primary font-medium rounded-lg text-sm px-5 py-2.5 shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google logo"
                className="w-5 h-5 mr-3"
              />
              <span>Sign in with Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
