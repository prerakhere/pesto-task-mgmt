import Task from "./Task";

type statusType = "todo" | "inprogress" | "done";

// const dummyTasks: {
//   id: number;
//   title: string;
//   description: string;
//   status: statusType;
//   statusCode?: string;
// }[] = [
//   {
//     id: 1,
//     title: "Do frontend of task management app.",
//     description: "some description 1",
//     status: "Todo",
//     statusCode: "todo",
//   },
//   {
//     id: 2,
//     title: "Do backend of task management app.",
//     description: "some description 2",
//     status: "In Progress",
//     statusCode: "inprogress",
//   },
//   {
//     id: 3,
//     title: "Do infra of task management app.",
//     description: "some description 3",
//     status: "Done",
//     statusCode: "done",
//   },
// ];

interface ITask {
  id: number;
  title: string;
  description: string;
  status: statusType;
  created_at: any;
}

export default function TaskList({
  filterParam,
  tasks,
  triggerRerender,
  areTasksLoading,
  setAreTasksLoading,
}: {
  filterParam: string;
  tasks: ITask[];
  triggerRerender: () => void;
  areTasksLoading: boolean;
  setAreTasksLoading: (loading: boolean) => void;
}) {
  const filteredTasks = tasks.filter((task: ITask) => {
    if (filterParam === "") return task;
    return task.status === filterParam;
  });

  return (
    <main className="w-full mt-8">
      <div className="">
        {!filteredTasks.length && (
          <p className="mt-12 text-center text-gray-500">No tasks</p>
        )}
        {filteredTasks.length > 0 &&
          filteredTasks.map(
            (task: {
              id: number;
              title: string;
              description: string;
              status: statusType;
            }) => {
              return (
                <Task
                  {...task}
                  key={task.id}
                  triggerRerender={triggerRerender}
                />
              );
            }
          )}
      </div>
    </main>
  );
}
