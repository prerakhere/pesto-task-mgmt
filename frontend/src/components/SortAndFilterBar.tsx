import React from "react";
import FilterSelect from "./FilterSelect";
import SortSelect from "./SortSelect";

interface ISortAndFilterBar {
  handleFilterChange: (newFilter: string) => void;
}

export default function SortAndFilterBar({
  handleFilterChange = (f) => f,
}: ISortAndFilterBar) {
  return (
    <div className="flex justify-between border my-5">
      <div>
        Filter
        <div className="inline-block">
          <FilterSelect handleFilterChange={handleFilterChange} />
        </div>
      </div>
      <div>
        Sort
        <div className="inline-block">
          <SortSelect />
        </div>
      </div>
    </div>
  );
}
