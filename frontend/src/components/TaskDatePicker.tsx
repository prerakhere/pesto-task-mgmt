import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@radix-ui/react-icons";

export default function TaskDatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="w-[160px] rounded-sm flex items-center justify-end">
      {/* <CalendarIcon width={20} className="self-center" /> */}
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        className="w-full border border-gray-700 focus:border focus:border-black ring-0 focus:ring-0 rounded-sm text-[15px] h-[34px]"
        icon={<CalendarIcon />}
        showIcon={true}
        calendarIconClassname="-ml-0.5 mt-[1.5px]"
        // class
      />
    </div>
  );
}
