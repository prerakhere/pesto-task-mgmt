import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import SortAndFilterBar from "./components/SortAndFilterBar";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  // const location = useLocation();
  const queryParams = useQuery();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  console.log("query...", queryParams);

  const statusFilter = queryParams.get("status") || "";

  function handleFilterChange(newFilter: string) {
    //   if(newFilter === "0") {
    //     // navigate(`?status=${newFilter}`);
    //     if(queryParams.has('status')) {
    //       queryParams.delete('status');
    //     }
    //   }
    //   // Update the URL
    //   navigate(`?status=${newFilter}`);
    const searchParams = new URLSearchParams(location.search);

    if (newFilter === "0") {
      // Remove the status parameter when "0"
      searchParams.delete("status");
    } else {
      searchParams.set("status", newFilter);
    }

    // Navigate with the new query string
    navigate({ pathname: location.pathname, search: searchParams.toString() });
  }

  console.log("location...", location); // logs "?d=2&s=3"
  // console.log("navigate...", navigate); // logs
  // navigate("/ok");
  const isAuthenticated = false;

  return (
    <div className="flex justify-center mt-10">
      <div className="w-1/2">
        <Navbar />
        <SortAndFilterBar handleFilterChange={handleFilterChange} />
        <TaskList statusFilter={statusFilter} />
        {!isAuthenticated && <></>}
        {isAuthenticated && <>authenticated tasks</>}
      </div>
    </div>
  );
}

export default Home;
