import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Task from "./Task";

type statusType = "todo" | "inprogress" | "done";

interface ITask {
  id: number;
  title: string;
  description: string;
  status: statusType;
  created_at: any;
}

export default function TaskList({
  currFilterParam,
  currSortParam,
  tasks,
  searchTerm,
  triggerRerender,
  areTasksLoading,
  setAreTasksLoading,
}: {
  currFilterParam: string;
  currSortParam: string;
  tasks: ITask[];
  searchTerm: string;
  triggerRerender: () => void;
  areTasksLoading: boolean;
  setAreTasksLoading: (loading: boolean) => void;
}) {
  const filteredTasks = tasks.filter((task: ITask) => {
    if (currFilterParam === "") return task;
    return task.status === currFilterParam;
  });

  filteredTasks.forEach((task) => {
    task.created_at = new Date(task.created_at);
  });

  // console.log(typeof filteredTasks[0].created_at);

  if (currSortParam === "firstadded")
    filteredTasks.sort((t1, t2) => t1.created_at - t2.created_at);
  console.log(filteredTasks);

  const finalTasks = filteredTasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    // if (tasks.length) {
    setTimeout(() => {
      if (tasks.length !== 0) setAreTasksLoading(false);
    }, 0);
    // }
  }, [tasks]);

  return (
    <main className="w-full mt-8">
      <div className="">
        {areTasksLoading ? (
          <div className="mt-24 text-center">
            <LoadingSpinner variant="large" color="dark" />
            <p className="text-xs text-gray-400 italic text-center">
              loading tasks...
            </p>
          </div>
        ) : (
          <>
            {!finalTasks.length && (
              <p className="mt-12 text-center text-gray-500">No tasks</p>
            )}
            {finalTasks.length > 0 &&
              finalTasks.map(
                (task: {
                  id: number;
                  title: string;
                  description: string;
                  status: statusType;
                  created_at: string;
                }) => {
                  return (
                    <Task
                      {...task}
                      key={task.id ? task.id : task.created_at}
                      triggerRerender={triggerRerender}
                    />
                  );
                }
              )}
          </>
        )}
      </div>
    </main>
  );
}
