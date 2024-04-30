import * as Dialog from "@radix-ui/react-dialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import TaskModal from "./TaskModal";
import { useState } from "react";

export default function SearchAndOptionsBar({
  triggerRerender,
}: {
  triggerRerender: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="mt-8 flex justify-between">
      <div className="w-3/4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="py-[5px] px-2 rounded border-[0.1rem] border-gray-300 focus:outline-none focus:border-violet-800 min-w-[300px] text-sm"
        />
      </div>
      <div className="w-1/4 flex justify-end">
        <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Dialog.Trigger asChild>
            <button className=" px-2.5 rounded bg-violet-700 border border-violet-700 text-white text-sm hover:bg-violet-800">
              <PlusCircledIcon className="inline mb-1 mr-1 h-[15px] w-[15px]" />
              Add Task
            </button>
          </Dialog.Trigger>
          <TaskModal
            id={0}
            title=""
            description=""
            status="Todo"
            triggerRerender={triggerRerender}
            setIsModalOpen={setIsModalOpen}
          />
        </Dialog.Root>
      </div>
    </div>
  );
}
