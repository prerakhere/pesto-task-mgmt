import React from "react";
import Task from "./Task";

export default function TaskList() {
  return (
    <main className="w-full mt-5">
      <div className="">
        <Task />
        <Task />
      </div>
    </main>
  );
}
