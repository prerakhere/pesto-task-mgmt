import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isEmailInvalid, isPasswordInvalid } from "../utils/AuthUtils";
import TextFieldError from "../components/TextFieldError";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    emailErr: "",
    pwErr: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const authData = useAuth();
  const navigate = useNavigate();

  const { session, isAuthContextLoading, signIn } = authData;

  useEffect(() => {
    if (session && !isAuthContextLoading) navigate("/");
  }, [session, isAuthContextLoading]);

  async function handleLogin() {
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
      const { error } = await signIn(email, password);
      if (error) console.log("-------------auth server error----------");
      if (error) console.log(error.message);
      if (error) throw new Error(error.message);
      setIsLoading(false);
    } catch (err: any) {
      if (err.message === "Invalid login credentials")
        setServerError("Incorrect email or password!");
      else toast.error("Something went wrong!");
      setIsLoading(false);
    }
  }

  /**
   * Invalid login credentials - either wrong email or wrong password
   */
  return (
    <>
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
                disabled={isLoading}
                onClick={handleLogin}
                className="bg-violet-700 hover:bg-violet-800 text-white font-semibold py-1.5 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 max-w-[120px]"
              >
                <span className="">Login</span>
                {isLoading && <LoadingSpinner variant="button" color="light" />}
              </button>
            </div>
            <div className="flex justify-center mt-1.5">
              <p className="text-over-xs">
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
