// src/pages/auth/Login.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Email & Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      toast.success("Logged in successfully!");
      navigate("/"); // Redirect to homepage
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      toast.success("Logged in with Google!");
      navigate("/"); // Redirect to homepage
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 pt-20">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Login to PawMart
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-orange-500 font-semibold hover:underline">
            Register here
          </Link>
        </p>

        <button
          onClick={handleGoogleLogin}
          className="mt-6 w-full border border-gray-300 hover:bg-gray-100 py-2 rounded flex items-center justify-center gap-2 transition"
        >
          <FcGoogle className="w-5 h-5" />
          Login with Google
        </button>
      </div>
    </div>
  );
}
