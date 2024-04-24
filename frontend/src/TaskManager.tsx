import { useState } from "react";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";

function TaskManager() {
  const [count, setCount] = useState(0);
  const isAuthenticated = false;

  return (
    <div className="flex justify-center mt-10">
      <div className="w-1/2">
        <Navbar />
        <TaskList />
        {!isAuthenticated && <></>}
        {isAuthenticated && <>authenticated tasks</>}
      </div>
    </div>
  );
}

export default TaskManager;
