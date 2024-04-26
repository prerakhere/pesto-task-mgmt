import React from "react";
import FilterSelect from "./FilterSelect";
import SortSelect from "./SortSelect";

export default function SortAndFilterBar() {
  return (
    <div className="flex justify-between border my-5">
      <div>
        Filter
        <div className="inline-block">
          <FilterSelect />
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
