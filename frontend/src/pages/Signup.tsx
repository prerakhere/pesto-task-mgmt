import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../config/auth-config";
import { useAuth } from "../context/AuthContext";
import { isEmailInvalid, isPasswordInvalid } from "../utils/AuthUtils";
import TextFieldError from "../components/TextFieldError";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    emailErr: "",
    pwErr: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const emailInputRef = useRef(null);

  const authData = useAuth();
  const navigate = useNavigate();

  const { session, isAuthContextLoading, signUp } = authData;

  useEffect(() => {
    if (session && !isAuthContextLoading) navigate("/");
  }, [session, isAuthContextLoading]);

  useEffect(() => {
    const emailInput = emailInputRef.current as HTMLInputElement | null;
    if (emailInput) {
      emailInput.focus();
    }
  }, []);

  async function handleSignup() {
    setIsLoading(true);
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
      setIsLoading(false);
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
      else toast.error("Something went wrong!");
      setIsLoading(false);
    }
  }

  return (
    <>
      {!authData.session && (
        <div className="mt-20 w-full">
          <form
            className="w-full flex items-center justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
          >
            <div className="border border-gray-300 px-16 pb-10 pt-8 w-5/6 max-w-[400px] rounded-md">
              <h1 className="text-center text-1.5xl font-semibold">Signup</h1>
              <div className="mt-10">
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
                  ref={emailInputRef}
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
              <div className="flex items-center justify-center mt-9">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-violet-700 hover:bg-violet-800 text-white font-semibold py-1.5 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 max-w-[120px]"
                >
                  <span className="">Sign Up</span>
                  {isLoading && (
                    <LoadingSpinner variant="button" color="light" />
                  )}
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
          </form>
        </div>
      )}
    </>
  );
}
