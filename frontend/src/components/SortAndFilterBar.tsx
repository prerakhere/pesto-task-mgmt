import React from "react";
import FilterSelect from "./FilterSelect";
import SortSelect from "./SortSelect";

interface ISortAndFilterBarProps {
  currFilterParam: string;
  currSortParam: string;
  handleFilterChange: (filterParam: string) => void;
  handleSortChange: (sortParam: string) => void;
}

export default function SortAndFilterBar({
  currFilterParam,
  currSortParam,
  handleFilterChange = (f) => f,
  handleSortChange = (f) => f,
}: ISortAndFilterBarProps) {
  return (
    <div className="flex justify-between border my-5">
      <div>
        Filter
        <div className="inline-block">
          <FilterSelect
            handleFilterChange={handleFilterChange}
            currFilterParam={currFilterParam}
          />
        </div>
      </div>
      <div>
        Sort
        <div className="inline-block">
          <SortSelect
            handleSortChange={handleSortChange}
            currSortParam={currSortParam}
          />
        </div>
      </div>
    </div>
  );
}
