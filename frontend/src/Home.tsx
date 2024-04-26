import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import SortAndFilterBar from "./components/SortAndFilterBar";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [count, setCount] = useState(0);
  // const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  console.log("query...", query);

  console.log("location...", location); // logs "?d=2&s=3"
  // console.log("navigate...", navigate); // logs
  navigate("/ok");
  const isAuthenticated = false;

  return (
    <div className="flex justify-center mt-10">
      <div className="w-1/2">
        <Navbar />
        <SortAndFilterBar />
        <TaskList />
        {!isAuthenticated && <></>}
        {isAuthenticated && <>authenticated tasks</>}
      </div>
    </div>
  );
}

export default Home;
