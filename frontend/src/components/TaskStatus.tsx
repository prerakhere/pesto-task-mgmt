const TaskStatusColors = {
  todo: "bg-red-600",
  inprogress: "bg-orange-500",
  done: "bg-green-600",
};

const TaskStatusText = {
  todo: "Todo",
  inprogress: "In Progress",
  done: "Done",
};

export default function TaskStatus({
  status,
}: {
  status: keyof typeof TaskStatusColors;
}) {
  return (
    <div className="flex border border-gray-300 rounded-full px-1.5 py-0.5 items-center">
      <div className="mr-1 text-xs">{TaskStatusText[status]}</div>
      <div
        className={`h-1.5 w-1.5 mt-0.5 rounded-full ${TaskStatusColors[status]}`}
      ></div>
    </div>
  );
}
