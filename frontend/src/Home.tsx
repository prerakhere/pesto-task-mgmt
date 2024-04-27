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

  let filterParam = queryParams.get("status") || "";
  let sortParam = queryParams.get("sortBy") || "";
  if (
    filterParam !== "all" &&
    filterParam !== "todo" &&
    filterParam !== "inprogress" &&
    filterParam !== "done"
  ) {
    filterParam = "";
  }

  if (
    sortParam !== "lastadded" &&
    sortParam !== "firstadded" &&
    sortParam !== "duedate"
  ) {
    sortParam = "";
  }

  function handleFilterChange(filterParam: string) {
    const searchParams = new URLSearchParams(location.search);

    if (filterParam === "all") {
      searchParams.delete("status");
      console.log("inside if block");
    } else if (
      filterParam === "todo" ||
      filterParam === "inprogress" ||
      filterParam === "done"
    ) {
      searchParams.set("status", filterParam);
      console.log("inside else if block");
    } else {
      console.log("inside else block");
      searchParams.delete("status");
      // searchParams.set("status", "all");
    }

    // Navigate with the new query string
    navigate({ pathname: location.pathname, search: searchParams.toString() });
  }

  function handleSortChange(sortParam: string) {
    const searchParams = new URLSearchParams(location.search);
    // if (sortParam === "lastadded") {
    //   searchParams.delete("sortBy");
    // } else {
    searchParams.set("sortBy", sortParam);
    // }
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
        <SortAndFilterBar
          currFilterParam={filterParam}
          currSortParam={sortParam}
          handleFilterChange={handleFilterChange}
          handleSortChange={handleSortChange}
        />
        <TaskList filterParam={filterParam} />
        {!isAuthenticated && <></>}
        {isAuthenticated && <>authenticated tasks</>}
      </div>
    </div>
  );
}

export default Home;
