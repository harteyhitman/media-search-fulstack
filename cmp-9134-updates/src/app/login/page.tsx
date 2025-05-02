"use client";

import { useState } from "react";
import { login } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import Image from "next/image";
import logo from "../../../public/openverse_logo.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { access_token, username } = await login(email, password);

      setToken(access_token);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("username", username); // ✅ Store username from API

      router.push("/dashboard");
    } catch (err: any) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <>
      <div className="logo-container flex justify-center items-center px-2 py-1">
        <Image
          src={logo}
          alt="Openverse Logo"
          className="logo-image rounded-full shadow-lg"
        />
      </div>
      <div className="flex justify-center items-center my-[100px]">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center"
        >
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg text-base font-medium hover:bg-blue-600 transition"
          >
            Login
          </button>
          <p className="mt-4 text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
