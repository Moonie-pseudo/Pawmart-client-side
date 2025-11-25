// src/pages/auth/Register.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      return toast.error("Please fill all required fields");
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error("Password must have at least 1 uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      return toast.error("Password must have at least 1 lowercase letter");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    try {
      // Create user with email/password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile with name and photoURL
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      // Set user in context
      setUser(userCredential.user);

      // Success toast & redirect
      toast.success("Registered successfully!");
      navigate("/");
    } catch (err) {
      // Common Firebase errors
      if (err.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Please login instead.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else if (err.code === "auth/weak-password") {
        toast.error("Password is too weak. Minimum 6 characters required.");
      } else {
        toast.error(err.message);
      }
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 pt-20">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Register at PawMart
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
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
          <input
            type="text"
            placeholder="Photo URL (optional)"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-semibold hover:underline">
            Login here
          </Link>
        </p>

        <button
          onClick={handleGoogleRegister}
          className="mt-6 w-full border border-gray-300 hover:bg-gray-100 py-2 rounded flex items-center justify-center gap-2 transition"
        >
          <FcGoogle className="w-5 h-5" />
          Register with Google
        </button>
      </div>
    </div>
  );
}
