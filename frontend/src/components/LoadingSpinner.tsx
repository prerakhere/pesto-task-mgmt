import React from "react";
import "../styles/LoadingSpinner.css";

export default function LoadingSpinner({
  variant,
  color,
}: {
  variant: string;
  color: string;
}) {
  return (
    <div className="inline-block align-middle mb-0.5 ml-2">
      <div className="">
        {variant === "large" && (
          <div className="sp-circle w-6 h-6 clear-both my-1.5 mx-auto border-4 border-gray-400 border-t-4 border-t-black"></div>
        )}
        {variant === "button" && (
          <div className="sp-circle w-3.5 h-3.5 align-bottom border-[3px] border-gray-200 border-t-[3px] border-t-gray-500"></div>
        )}
      </div>
    </div>
  );
}
