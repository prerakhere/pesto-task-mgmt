import Task from "./Task";

type statusType = "Todo" | "In Progress" | "Done";

const dummyTasks: {
  id: number;
  title: string;
  description: string;
  status: statusType;
  statusCode?: string;
}[] = [
  {
    id: 1,
    title: "Do frontend of task management app.",
    description: "some description 1",
    status: "Todo",
    statusCode: "todo",
  },
  {
    id: 2,
    title: "Do backend of task management app.",
    description: "some description 2",
    status: "In Progress",
    statusCode: "inprogress",
  },
  {
    id: 3,
    title: "Do infra of task management app.",
    description: "some description 3",
    status: "Done",
    statusCode: "done",
  },
];

export default function TaskList({
  filterParam,
  triggerRerender,
}: {
  filterParam: string;
  triggerRerender: () => void;
}) {
  const filteredTasks = dummyTasks.filter((task) => {
    if (filterParam === "") return task;
    return task.statusCode === filterParam;
  });

  return (
    <main className="w-full mt-5">
      <div className="">
        {filteredTasks.map(
          (task: {
            id: number;
            title: string;
            description: string;
            status: statusType;
          }) => {
            return (
              <Task {...task} key={task.id} triggerRerender={triggerRerender} />
            );
          }
        )}
      </div>
    </main>
  );
}
