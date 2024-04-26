import React from "react";

const TaskStatusColors = {
  Todo: "bg-red-600",
  "In Progress": "bg-orange-500",
  Done: "bg-green-600",
};

export default function TaskStatus({
  status,
}: {
  status: keyof typeof TaskStatusColors;
}) {
  return (
    <div className="flex border rounded-full px-1 py-0.5 items-center">
      <div className="mr-1 text-xs">{status}</div>
      <div
        className={`h-1.5 w-1.5 rounded-full ${TaskStatusColors[status]}`}
      ></div>
    </div>
  );
}
