import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../config/auth-config";
import { useAuth } from "../context/AuthContext";
import { isEmailInvalid, isPasswordInvalid } from "../utils/AuthUtils";
import TextFieldError from "../components/TextFieldError";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    emailErr: "",
    pwErr: "",
  });
  const [serverError, setServerError] = useState("");

  const authData = useAuth();
  const navigate = useNavigate();

  const { session, loading, signUp } = authData;

  useEffect(() => {
    if (session) navigate("/");
  }, [session]);

  async function handleSignup() {
    setServerError("");
    setFieldErrors({
      emailErr: "",
      pwErr: "",
    });
    const emailErr = isEmailInvalid(email);
    const pwErr = isPasswordInvalid(password);
    if (emailErr || pwErr) {
      console.log(emailErr, pwErr);
      if (emailErr)
        setFieldErrors((err) => ({
          ...err,
          emailErr,
        }));
      if (pwErr)
        setFieldErrors((err) => ({
          ...err,
          pwErr,
        }));
      return;
    }

    try {
      const { error } = await signUp(email, password);

      if (error) throw new Error(error.message);
      // alert("check email for verification link");
      // console.log(data);
    } catch (err: any) {
      // console.log(err)
      if (err.message === "Invalid login credentials")
        setServerError("Incorrect email or password!");
      else setServerError(err.message);
    }
  }

  return (
    <>
      {loading && <p>loading...</p>}
      {!authData.session && (
        <div className="flex items-center justify-center mt-20 border w-full">
          <div className="border px-16 py-14 w-5/6 max-w-[400px]">
            <div className="">
              <label
                className="block text-gray-700 text-sm font-bold mb-1.5"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-violet-800 text-sub-base -mb-[3px]"
                placeholder="Enter email"
                required
              />
              <TextFieldError error={fieldErrors.emailErr} />
            </div>
            <div className="mt-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-1.5"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-violet-800 text-sub-base -mb-[3px]"
                placeholder="Enter password"
                required
              />
              <TextFieldError error={fieldErrors.pwErr} />
            </div>
            {serverError && (
              <div className="flex justify-center items-center mt-5">
                <span className="text-over-xs max-w-fit py-1.5 px-4 rounded-sm text-red-700 border border-red-600 bg-red-100">
                  {serverError}
                </span>
              </div>
            )}
            <div className="flex items-center justify-center mt-7">
              <button
                type="submit"
                onClick={handleSignup}
                className="bg-violet-700 hover:bg-violet-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 max-w-[120px]"
              >
                Sign Up
              </button>
            </div>
            <div className="flex justify-center mt-1.5">
              <p className="text-over-xs">
                Already a user?{" "}
                <Link
                  to={"/login"}
                  className="cursor-pointer underline text-violet-700 hover:text-black"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
