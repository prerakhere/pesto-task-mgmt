import React from "react";

export default function TaskStatus({ status }: { status: string }) {
  return (
    <div className="flex border rounded-full px-1 py-0.5 items-center">
      <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
      <div className="ml-1 text-xs">{status}</div>
    </div>
  );
}
