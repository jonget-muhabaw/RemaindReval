import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-md md:max-w-lg bg-white border border-gray-200 p-6 sm:p-8 rounded-lg shadow">
        <form action="#" className="space-y-6">
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
          <Link
            to="/dashboard"
            className="block w-full text-white bg-primary hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => {
              console.log("Navigating to dashboard");
            }}
          >
            Login
          </Link>

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
