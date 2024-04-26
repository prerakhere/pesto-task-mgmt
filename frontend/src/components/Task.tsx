import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import TaskStatus from "./TaskStatus";
import TaskModal from "./TaskModal";

/**
 * check authentication status
 * if authenticated - fetch tasks
 * if not authenticated - fetch localStorage tasks
 */

type statusType = "Todo" | "In Progress" | "Done";

export default function Task({
  id,
  title,
  description,
  status,
}: {
  id: number;
  title: string;
  description: string;
  status: statusType;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div
          className="flex justify-between border rounded-md my-5 p-3 hover:bg-slate-100 cursor-pointer"
          onClick={() => {
            console.log("clicked");
          }}
        >
          <div className="flex flex-col w-5/6">
            <div className="w-fit">
              <h1 className="text-lg hover:underline">{title}</h1>
            </div>
            <div className="mt-1 text-sm">{description}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm">
              <TaskStatus status={status} />
            </div>
            {/* <div className="text-sm">due date</div> */}
          </div>
        </div>
      </Dialog.Trigger>
      <TaskModal />
    </Dialog.Root>
  );
}
