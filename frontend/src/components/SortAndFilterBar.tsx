import * as Dialog from "@radix-ui/react-dialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import TaskModal from "./TaskModal";
import FilterSelect from "./FilterSelect";
import SortSelect from "./SortSelect";
import { useState } from "react";

interface ISortAndFilterBarProps {
  currFilterParam: string;
  currSortParam: string;
  handleFilterChange: (filterParam: string) => void;
  handleSortChange: (sortParam: string) => void;
  triggerRerender: () => void;
}

export default function SortAndFilterBar({
  currFilterParam,
  currSortParam,
  handleFilterChange = (f) => f,
  handleSortChange = (f) => f,
  triggerRerender,
}: ISortAndFilterBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex justify-between mt-3.5">
      <div className="flex">
        <div>
          <span className="text-sm">Filter</span>
          <div className="inline-block">
            <FilterSelect
              handleFilterChange={handleFilterChange}
              currFilterParam={currFilterParam}
            />
          </div>
        </div>
        <div className="ml-5">
          <span className="text-sm">Sort</span>
          <div className="inline-block">
            <SortSelect
              handleSortChange={handleSortChange}
              currSortParam={currSortParam}
            />
          </div>
        </div>
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
