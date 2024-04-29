import AccountMenu from "./AccountMenu";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const authData = useAuth();

  return (
    <nav className="border-b flex justify-between py-1.5">
      <h1 className="text-xl mt-0.5 font-semibold">Task Manager</h1>

      {authData.session ? (
        <div>
          <AccountMenu />
        </div>
      ) : (
        <Link
          to={"/login"}
          className="p-1 px-3.5 border border-violet-700 rounded hover:bg-violet-100 text-sm shadow"
        >
          Login
        </Link>
      )}
    </nav>
  );
}
