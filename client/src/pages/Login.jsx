import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../context/useAuth";

import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate= useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Login in successfully!')
      navigate('/')
    } catch (error) {
      console.log(error);
      toast.error(error || 'failed to login');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="p-4 bg-white rounded-md w-[80%] md:w-[40%] shadow-2xl">
        <h1 className="text-2xl md:text-3xl text-center ">Login </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="Name" className="block mb-2">
              {" "}
              Email
            </label>
            <input
              type="text"
              placeholder="your email"
              className="px-4 py-2 border w-full bg-slate-200 rounded-md outline-none"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="******"
              className="px-4 py-2 border w-full bg-slate-200 rounded-md outline-none"
               value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 w-full text-gray-100 bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            {loading ? 'logging':"Login"}
          </button>
          <p className="text-sm text-slate-600 p-3">
            Dont have an account ?{" "}
            <Link
              className="ml-3 decoration-black text-purple-500"
              to={"/register"}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
