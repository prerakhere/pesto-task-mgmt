import { useState } from "react";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import TaskModal from "./TaskModal";

export default function SearchAndOptionsBar({
  triggerRerender,
}: {
  triggerRerender: () => void;
}) {
  return (
    <div className="mt-8 flex justify-between">
      <div className="w-3/4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="py-[5px] px-2 rounded border-[0.1rem] border-gray-300 focus:outline-none focus:border-violet-800 min-w-[350px] text-sm"
        />
      </div>
    </div>
  );
}
