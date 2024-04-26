import React from "react";
import Task from "./Task";

type statusType = "Todo" | "In Progress" | "Done";

const dummyTasks: {
  id: number;
  title: string;
  description: string;
  status: statusType;
  statusCode?: string;
}[] = [
  {
    id: 1,
    title: "Do frontend of task management app.",
    description: "some description 1",
    status: "Todo",
    statusCode: "1",
  },
  {
    id: 2,
    title: "Do backend of task management app.",
    description: "some description 2",
    status: "In Progress",
    statusCode: "2",
  },
  {
    id: 3,
    title: "Do infra of task management app.",
    description: "some description 3",
    status: "Done",
    statusCode: "3",
  },
];

export default function TaskList({ statusFilter }: { statusFilter: string }) {
  const filteredTasks = dummyTasks.filter((task) => {
    if (statusFilter === "") return task;
    return task.statusCode === statusFilter;
  });

  return (
    <main className="w-full mt-5">
      <div className="">
        {filteredTasks.map(
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
