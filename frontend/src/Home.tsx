import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import SortAndFilterBar from "./components/SortAndFilterBar";
import SearchAndOptionsBar from "./components/SearchAndOptionsBar";
import { useAuth } from "./context/AuthContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  // const location = useLocation();
  const queryParams = useQuery();
  const navigate = useNavigate();
  const authInfo = {};
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState([]);
  const [trigger, setTrigger] = useState(false);
  console.log("query...", queryParams);

  /**
   * 1. set received token in localstorage

2. fetch user id based on email id from db
+
3. get all tasks from db of that user id
   */
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

  const triggerRerender = () => {
    // This toggles the state, ensuring a re-render each time it's called
    setTrigger((prev) => !prev);
  };

  console.log("location...", location); // logs "?d=2&s=3"
  // console.log("navigate...", navigate); // logs
  // navigate("/ok");
  const isAuthenticated = false;

  const { session, user } = useAuth();
  console.log("-------------auth context session-----------");
  console.log(session);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://d12hukpp1zen6s.cloudfront.net/api/2/task"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const resData = await response.json();
        console.log("---resData---");
        console.log(resData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex justify-center mt-10">
      <div className="w-1/2">
        <Navbar />
        <SearchAndOptionsBar triggerRerender={triggerRerender} />
        <SortAndFilterBar
          currFilterParam={filterParam}
          currSortParam={sortParam}
          handleFilterChange={handleFilterChange}
          handleSortChange={handleSortChange}
          triggerRerender={triggerRerender}
        />
        <TaskList filterParam={filterParam} triggerRerender={triggerRerender} />
        {!isAuthenticated && <></>}
        {isAuthenticated && <>authenticated tasks</>}
      </div>
    </div>
  );
}

export default Home;
