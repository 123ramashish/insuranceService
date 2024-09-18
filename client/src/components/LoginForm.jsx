import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal } from "flowbite-react";
import { signInSuccess } from "../redux/user/userSlice.js";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to Login. Provide correct data and try again.");
      }

      const data = await response.json();
      dispatch(signInSuccess(data));
      navigate("/dashboard"); // Navigate to dashboard after successful login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-1 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-1 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <p className="flex items-center">
            <span className="text-md font-bold">Login as: </span>
            &nbsp;admin&nbsp;
            <input
              type="checkbox"
              id="admin"
              onClick={() => setOpenModal(true)}
            />
          </p>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 my-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p>
          Don&apos;t have an account?{" "}
          <a href="/signup" className="underline text-blue-500">
            Create
          </a>
        </p>
      </form>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Admin</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              If you want to sign in as an admin, please{" "}
              <span className="font-semibold">WhatsApp/contact</span> us at{" "}
              <span className="text-blue-500">+91-7542918414</span>. Once
              verified, you can manage the application.
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginForm;
