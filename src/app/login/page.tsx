"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter(); // For page navigation

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_email: email, password }),
        credentials: "include", // Send cookies
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Welcome, ${data.name}!`);
        router.push("/after-login-page"); // Navigate after successful login
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while communicating with the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-extrabold text-yellow-600 mb-6">Login</h1>
      <form onSubmit={handleLogin} className="w-80 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-yellow-300 rounded-md focus:ring-yellow-400 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-yellow-300 rounded-md focus:ring-yellow-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 rounded-md text-white font-bold transition-all ${
            loading ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-700">
        Don't have an account?{" "}
        <a href="/register" className="text-yellow-600 hover:underline font-medium">
          Register
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
