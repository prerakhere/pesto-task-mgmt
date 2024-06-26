import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import TaskStatus from "./TaskStatus";
import TaskModal from "./TaskModal";

/**
 * check authentication status
 * if authenticated - fetch tasks
 * if not authenticated - fetch localStorage tasks
 */

type statusType = "todo" | "inprogress" | "done";

export default function Task({
  id,
  title,
  description,
  status,
  triggerRerender,
}: {
  id: number;
  title: string;
  description: string;
  status: statusType;
  triggerRerender: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Dialog.Trigger asChild>
        <div
          className="flex justify-between border border-gray-300 rounded-md my-3.5 py-2.5 sm:py-3.5 px-2.5 sm:px-4 hover:bg-violet-100 cursor-pointer hover:border-violet-700 hover:shadow-lg"
          onClick={() => {
            console.log("clicked");
          }}
        >
          <div className="flex flex-col w-2/3 sm:w-3/4">
            <div className="w-fit">
              <h1 className="hover:underline font-medium">{title}</h1>
            </div>
            <div className="mt-2 text-sub-sm">{description}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm">
              <TaskStatus status={status} />
            </div>
          </div>
        </div>
      </Dialog.Trigger>
      <TaskModal
        id={id}
        title={title}
        description={description}
        status={status}
        triggerRerender={triggerRerender}
        setIsModalOpen={setIsModalOpen}
      />
    </Dialog.Root>
  );
}
