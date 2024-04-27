import React from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

interface IFilterSelectProps {
  currFilterParam: string;
  handleFilterChange: (newFilter: string) => void;
}

export default function FilterSelect({
  currFilterParam,
  handleFilterChange = (f) => f,
}: IFilterSelectProps) {
  return (
    <div className="ml-1 border border-red-400">
      <Select.Root
        defaultValue={currFilterParam !== "" ? currFilterParam : "all"}
        onValueChange={(value) => handleFilterChange(value)}
      >
        <Select.Trigger
          className="inline-flex items-center justify-center rounded-sm px-3 py-2 text-[13px] leading-none bg-white border border-gray-700 focus:border-black focus:outline-none focus:bg-violet-100 ring-0 focus:ring-0 hover:bg-violet-100  focus:shadow-black outline-none"
          aria-label="Status"
        >
          <Select.Value />
          <Select.Icon className="ml-4">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] focus:ring-0"
            position="popper"
          >
            <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-[5px]">
              <Select.Group>
                {/* <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Fruits
              </Select.Label> */}
                <Select.Item
                  value="all"
                  className="text-[13px] leading-none rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet-400"
                >
                  <Select.ItemText className="flex">
                    <span className="ml-3">All</span>
                  </Select.ItemText>
                  <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
                <Select.Item
                  value="todo"
                  className="text-[13px] leading-none rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet-400"
                >
                  <Select.ItemText className="flex">
                    <div className="h-[6.5px] w-[6.5px] rounded-full bg-red-600 inline-block"></div>
                    <span className="ml-1.5">To Do</span>
                  </Select.ItemText>
                  <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
                <Select.Item
                  value="inprogress"
                  className="text-[13px] leading-none rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet-400"
                >
                  <Select.ItemText className="flex">
                    <div className="h-[6.5px] w-[6.5px] rounded-full bg-orange-400 inline-block"></div>
                    <span className="ml-1.5">In Progress</span>
                  </Select.ItemText>
                  <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
                <Select.Item
                  value="done"
                  className="text-[13px] leading-none rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet-400"
                >
                  <Select.ItemText className="flex">
                    <div className="h-[6.5px] w-[6.5px] rounded-full bg-green-600 inline-block"></div>
                    <span className="ml-1.5">Done</span>
                  </Select.ItemText>
                  <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
