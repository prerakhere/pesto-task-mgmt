import React from "react";
import ReactDOM from "react-dom/client";
import TaskManager from "./TaskManager.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TaskManager />
  </React.StrictMode>
);
