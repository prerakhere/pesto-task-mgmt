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
  const [error, setError] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [areTasksLoading, setAreTasksLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  // console.log("query...", queryParams);

  /**
   * 1. set received token in localstorage

2. fetch user id based on email id from db
+
3. get all tasks from db of that user id
   */

  console.log("trigger...", trigger);
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
      // console.log("inside if block");
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

  // console.log("location...", location); // logs "?d=2&s=3"
  // console.log("navigate...", navigate); // logs
  // navigate("/ok");
  const isAuthenticated = false;

  const { userId, isAuthContextLoading } = useAuth();
  console.log("--------userId---------- ", userId);

  useEffect(() => {
    const fetchTasks = async () => {
      if (userId) {
        try {
          setAreTasksLoading(true);
          localStorage.removeItem("tasksJSON");
          const response = await fetch(
            `http://localhost:3000/api/${userId}/task`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const resData = await response.json();
          console.log("---resData---");
          console.log(resData);
          if (resData.allTasks.length === 0) {
            const tasksJSON = localStorage.getItem("tasksJSON");
            if (tasksJSON) {
              const lsTasks = JSON.parse(tasksJSON);
              if (Array.isArray(lsTasks) && lsTasks.length > 0) {
                console.log("saving bulk tasks...");
                const response = await fetch(
                  `http://localhost:3000/api/${userId}/tasks`,
                  {
                    method: "POST",
                    body: JSON.stringify(lsTasks),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (!response.ok) {
                  throw new Error("unable to add task");
                }
                const data = await response.json();
                console.log("?????//  data  ??????//");
                if (data.message === "tasks created") {
                  console.log("tasks saved");
                }
              }
            }
          }
          setTasks(resData.allTasks);
        } catch (err) {
          console.log(err);
        }
      } else {
        const tasksJSON = localStorage.getItem("tasksJSON");
        if (!tasksJSON) setTasks([]);
        else {
          const lsTaskList = JSON.parse(tasksJSON) || [];
          console.log("----lsTasklist---");
          console.log(lsTaskList);
          setTasks(lsTaskList);
        }
      }
      // setAreTasksLoading(false);
    };
    fetchTasks();
    // if (!userId) setTasks([]);
  }, [userId, trigger]);

  return (
    <div className="flex justify-center mt-10 w-full">
      {isAuthContextLoading ? null : (
        <div className="w-11/12 xs:w-3/4 md:w-2/3 lg:w-7/12 max-w-[700px]">
          <Navbar />
          <SearchAndOptionsBar
            triggerRerender={triggerRerender}
            setSearchTerm={setSearchTerm}
          />
          <SortAndFilterBar
            currFilterParam={filterParam}
            currSortParam={sortParam}
            handleFilterChange={handleFilterChange}
            handleSortChange={handleSortChange}
            triggerRerender={triggerRerender}
          />
          <TaskList
            currFilterParam={filterParam}
            currSortParam={sortParam}
            triggerRerender={triggerRerender}
            setAreTasksLoading={setAreTasksLoading}
            areTasksLoading={areTasksLoading}
            tasks={tasks}
            searchTerm={searchTerm}
          />
          {!isAuthenticated && <></>}
          {isAuthenticated && <>authenticated tasks</>}
        </div>
      )}
    </div>
  );
}

export default Home;
