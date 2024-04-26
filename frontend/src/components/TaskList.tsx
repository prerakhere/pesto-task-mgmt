import React from "react";
import Task from "./Task";

type statusType = "Todo" | "In Progress" | "Done";

const dummyTasks: {
  id: number;
  title: string;
  description: string;
  status: statusType;
}[] = [
  {
    id: 1,
    title: "Do frontend of task management app.",
    description: "some description 1",
    status: "Todo",
  },
  {
    id: 2,
    title: "Do backend of task management app.",
    description: "some description 2",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Do infra of task management app.",
    description: "some description 3",
    status: "Done",
  },
];

export default function TaskList() {
  return (
    <main className="w-full mt-5">
      <div className="">
        {dummyTasks.map(
          (task: {
            id: number;
            title: string;
            description: string;
            status: statusType;
          }) => {
            return <Task {...task} />;
          }
        )}
      </div>
    </main>
  );
}
