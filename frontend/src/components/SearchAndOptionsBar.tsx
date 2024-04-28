import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import TaskModal from "./TaskModal";

export default function SearchAndOptionsBar({
  triggerRerender,
}: {
  triggerRerender: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="my-5 flex justify-between mt-8">
      <div className="w-3/4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="py-[5px] px-2 rounded border-[0.1rem] border-gray-300 focus:outline-none focus:border-violet-800 min-w-[250px]"
        />
      </div>
      <div className="w-1/4 flex justify-end">
        <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Dialog.Trigger asChild>
            <button className=" px-2.5 rounded bg-violet-700 text-white text-sm hover:bg-violet-800">
              <PlusCircledIcon className="inline mb-1 mr-1 h-[17px] w-[17px]" />
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
