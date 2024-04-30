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
    </div>
  );
}
