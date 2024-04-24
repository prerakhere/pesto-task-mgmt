import React from "react";
import TaskStatus from "./TaskStatus";

/**
 * check authentication status
 * if authenticated - fetch tasks
 * if not authenticated - fetch localStorage tasks
 */

export default function Task() {
  return (
    <div
      className="flex justify-between border rounded my-4 p-3 hover:bg-slate-100 cursor-pointer"
      onClick={() => {
        console.log("clicked");
      }}
    >
      <div className="flex flex-col border w-5/6">
        <div className="w-fit">
          <h1 className="text-lg hover:underline">task title</h1>
        </div>
        <div className="mt-1 text-sm">desc</div>
      </div>
      <div className="border flex flex-col">
        <div className="text-sm">
          <TaskStatus status="In Progress" />
        </div>
        <div className="text-sm">due date</div>
      </div>
    </div>
  );
}
