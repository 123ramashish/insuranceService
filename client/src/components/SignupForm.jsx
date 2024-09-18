import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    emailVerificationCode: "",
    password: "",
    error: "",
    success: "",
    showVerification: false,
    loading: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setFormState((prevState) => ({ ...prevState, loading: true }));

    try {
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          password: formState.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up. Please try again.");
      }

      setFormState((prevState) => ({
        ...prevState,
        success: "Please verify your email.",
        error: "",
        showVerification: true,
        loading: false,
      }));
    } catch (err) {
      setFormState((prevState) => ({
        ...prevState,
        error: err.message,
        success: "",
        loading: false,
      }));
    }
  };

  const handleEmailVerification = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.email,
            otp: formState.emailVerificationCode,
            password: formState.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid verification code. Please try again.");
      }

      setFormState((prevState) => ({
        ...prevState,
        success: "Email verified successfully!",
        error: "",
      }));
      navigate("/login");
    } catch (err) {
      setFormState((prevState) => ({
        ...prevState,
        error: err.message,
        success: "",
      }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg  w-full max-w-md">
      <h2 className="text-2xl font-bold font-serif mb-6 text-center">Signup</h2>
      {!formState.showVerification ? (
        <form onSubmit={handleSignup} className="mb-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-bold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded"
              required
            />
          </div>
          {formState.error && (
            <p className="text-red-500 text-sm">{formState.error}</p>
          )}
          {formState.success && (
            <p className="text-green-500 text-sm">{formState.success}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 my-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={formState.loading}
          >
            {formState.loading ? "Please wait..." : "Sign Up"}{" "}
            {/* Button text changes based on loading state */}
          </button>
          <p>
            Already account?{" "}
            <a href="/login" className="underline text-blue-500">
              Login
            </a>{" "}
          </p>
        </form>
      ) : (
        <form onSubmit={handleEmailVerification}>
          <div className="mb-4">
            <label
              htmlFor="emailVerificationCode"
              className="block text-sm font-semibold text-gray-700"
            >
              Verify Your Email
            </label>
            <div className="flex gap-4 items-center justify-center">
              <input
                type="text"
                id="emailVerificationCode"
                value={formState.emailVerificationCode}
                onChange={handleChange}
                className="w-3/4 px-3 py-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-1/4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Verify Email
              </button>
            </div>
          </div>
          {formState.error && (
            <p className="text-red-500 text-sm">{formState.error}</p>
          )}
          {formState.success && (
            <p className="text-green-500 text-sm">{formState.success}</p>
          )}
        </form>
      )}
    </div>
  );
}

export default SignupForm;
