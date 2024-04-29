import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../config/auth-config";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authData = useAuth();
  const navigate = useNavigate();
  if (authData.session) navigate("/");

  async function handleLogin() {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);
      // alert("check email for verification link");
      console.log(data);
    } catch (err: any) {
      // console.log(err)
      alert(err.message);
    }
  }

  return (
    <>
      {!authData.session && (
        <div className="flex items-center justify-center mt-20 border w-full">
          <div className="border px-16 py-14 w-5/6 max-w-[400px]">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-violet-800"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mb-8">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-violet-800"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                onClick={handleLogin}
                className="bg-violet-700 hover:bg-violet-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 max-w-[120px]"
              >
                Login
              </button>
            </div>
            <div className="flex justify-center mt-1.5">
              <p className="text-sm">
                New user?{" "}
                <Link
                  to={"/signup"}
                  className="cursor-pointer underline text-violet-700 hover:text-black"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
