import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, TrashIcon } from "@radix-ui/react-icons";
import TaskStatusSelect from "./TaskStatusSelect";
import TaskDatePicker from "./TaskDatePicker";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { isTaskDescInvalid, isTaskNameInvalid } from "../utils/TaskUtils";
import TextFieldError from "./TextFieldError";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";

interface ITaskModalProps {
  id: number;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "done";
  triggerRerender: () => void;
  setIsModalOpen: (bool: boolean) => void;
}

const TaskModal = ({
  id,
  title,
  description,
  status,
  triggerRerender,
  setIsModalOpen,
}: ITaskModalProps) => {
  const [modalTitle, setModalTitle] = useState(title);
  const [modalDesc, setModalDesc] = useState(description);
  const [modalStatus, setModalStatus] = useState<
    "todo" | "inprogress" | "done"
  >(status);
  const [isSaveBtnLoading, setIsSaveBtnLoading] = useState(false);
  const [isDeleteBtnLoading, setIsDeleteBtnLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    titleErr: "",
    descErr: "",
  });

  const { userId } = useAuth();

  function resetModalState() {
    setModalTitle("");
    setModalDesc("");
    setModalStatus("todo");
    setIsSaveBtnLoading(false);
    setIsDeleteBtnLoading(false);
    setIsModalOpen(false);
  }

  async function handleTaskSave(e: any) {
    e.preventDefault();
    setIsSaveBtnLoading(true);
    setFieldErrors({
      titleErr: "",
      descErr: "",
    });
    const titleErr = isTaskNameInvalid(modalTitle);
    const descErr = isTaskDescInvalid(modalDesc);
    if (titleErr || descErr) {
      console.log(titleErr, descErr);
      if (titleErr)
        setFieldErrors((err) => ({
          ...err,
          titleErr,
        }));
      if (descErr)
        setFieldErrors((err) => ({
          ...err,
          descErr,
        }));
      setIsSaveBtnLoading(false);
      return;
    }
    if (userId) {
      if (id === 0) {
        // new task
        try {
          const response = await fetch(
            `${import.meta.env.VITE_PROD_API_BASE_URL}/${userId}/task`,
            {
              method: "POST",
              body: JSON.stringify({
                title: modalTitle,
                description: modalDesc,
                status: modalStatus,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          // const response = await fetch(
          //   `${import.meta.env.VITE_LOCAL_API_BASE_URL}/${userId}/task`,
          //   {
          //     method: "POST",
          //     body: JSON.stringify({
          //       title: modalTitle,
          //       description: modalDesc,
          //       status: modalStatus,
          //     }),
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //   }
          // );
          if (!response.ok) {
            throw new Error("unable to add task");
          }
          const data = await response.json();
          console.log("?????//  data  ??????//");
          if (data.message === "task created") {
            console.log("task saved");
            resetModalState();
            triggerRerender();
          }
        } catch (err: any) {
          toast.error("Something went wrong!");
          resetModalState();
        }
      } else {
        // existing task
        try {
          const response = await fetch(
            `${import.meta.env.VITE_PROD_API_BASE_URL}/${userId}/task/${id}`,
            {
              method: "PUT",
              body: JSON.stringify({
                title: modalTitle,
                description: modalDesc,
                status: modalStatus,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          // const response = await fetch(
          //   `${import.meta.env.VITE_LOCAL_API_BASE_URL}/${userId}/task/${id}`,
          //   {
          //     method: "PUT",
          //     body: JSON.stringify({
          //       title: modalTitle,
          //       description: modalDesc,
          //       status: modalStatus,
          //     }),
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //   }
          // );
          if (!response.ok) {
            throw new Error("unable to update task");
          }
          const data = await response.json();
          console.log("?????//  data  ??????//");
          if (data.message === "task updated") {
            console.log("task updated");
            resetModalState();
            triggerRerender();
          }
        } catch (err: any) {
          toast.error("Something went wrong!");
          resetModalState();
        }
      }
    } else {
      // save to local storage
      try {
        const tasksJSON = localStorage.getItem("tasksJSON");
        const taskList = tasksJSON ? JSON.parse(tasksJSON) : [];
        const newTask = {
          title: modalTitle,
          description: modalDesc,
          status: modalStatus,
          created_at: new Date().toISOString(),
        };
        taskList.push(newTask);
        localStorage.setItem("tasksJSON", JSON.stringify(taskList));
      } catch (err) {
        toast.error("Something went wrong!");
      }
      resetModalState();
      triggerRerender();
    }
  }

  function handleCancelClick() {
    if (id === 0) {
      resetModalState();
      setFieldErrors({
        titleErr: "",
        descErr: "",
      });
    }
  }

  async function handleTaskDelete(e: any) {
    e.preventDefault();
    setIsDeleteBtnLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PROD_API_BASE_URL}/${userId}/task/${id}`,
        {
          method: "DELETE",
        }
      );
      // const response = await fetch(
      //   `${import.meta.env.VITE_LOCAL_API_BASE_URL}/${userId}/task/${id}`,
      //   {
      //     method: "DELETE",
      //   }
      // );
      if (!response.ok) {
        throw new Error("unable to delete task");
      }
      const data = await response.json();
      console.log("?????//  data  ??????//");
      if (data.message === "task deleted") {
        console.log("task deleted");
        resetModalState();
        triggerRerender();
      }
    } catch (err: any) {
      toast.error("Something went wrong!");
      resetModalState();
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 rounded-3xl" />
      <Dialog.Content
        className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[95vh] w-[90vw] max-w-[650px] translate-x-[-50%] translate-y-[-50%] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none rounded-lg"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Dialog.Title className="text-white m-0 text-[17px] font-medium bg-violet-700 py-3.5 px-8 rounded-t-lg">
          Edit Task
        </Dialog.Title>
        {/* <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
        Edit task
      </Dialog.Description> */}
        <div className="m-8">
          <fieldset className="flex flex-col sm:flex-row relative">
            <label className="text-[14px] w-[90px]" htmlFor="title">
              Title
            </label>
            <input
              className="inline-flex py-1.5 w-full flex-1 items-center justify-center rounded-sm px-2 text-[15px] leading-none border border-gray-700 focus:border-black focus:outline-none ring-0 focus:ring-0"
              id="title"
              type="text"
              // defaultValue={title}
              value={modalTitle}
              onChange={(e) => setModalTitle(e.target.value)}
            />
            <span className="absolute sm:ml-[90px] -bottom-[18px]">
              <TextFieldError error={fieldErrors.titleErr} />
            </span>
          </fieldset>
          <fieldset className="mt-9 flex flex-col sm:flex-row relative">
            <label className="w-[90px] text-[14px]" htmlFor="description">
              Description
            </label>
            <textarea
              className="h-[150px] py-1.5 w-full sm:flex-1 px-2 rounded-sm text-[15px] leading-[1.15rem] border border-gray-700 focus:border-black focus:outline-none ring-0 focus:ring-0 resize-none"
              id="description"
              // defaultValue={description}
              value={modalDesc}
              onChange={(e) => setModalDesc(e.target.value)}
            />
            <span className="absolute sm:ml-[90px] -bottom-[18px]">
              <TextFieldError error={fieldErrors.descErr} />
            </span>
          </fieldset>
          <div className="flex flex-col sm:flex-row mt-9 justify-between">
            <fieldset className="flex items-center w-full sm:w-1/2 focus:ring-0">
              <label
                className="w-[90px] sm:w-[90px] text-[15px]"
                htmlFor="status"
              >
                Status
              </label>
              <TaskStatusSelect
                status={status}
                setModalStatus={setModalStatus}
              />
            </fieldset>
          </div>
          <div className="mt-12 flex justify-between items-center">
            <div className=" ">
              {id > 0 && (
                <>
                  <button
                    className="text-red-600 text-sm pl-1 pr-1.5 py-0.5 border border-white rounded hover:border-red-600"
                    onClick={handleTaskDelete}
                    disabled={isDeleteBtnLoading || isSaveBtnLoading}
                  >
                    <TrashIcon className="inline align-middle mb-[3px] mr-[3px] w-4 h-4" />
                    Delete
                  </button>
                  {isDeleteBtnLoading && (
                    <LoadingSpinner variant="button" color="light" />
                  )}
                </>
              )}
            </div>
            <div>
              <Dialog.Close asChild>
                <div>
                  <button
                    className="bg-white text-black border border-gray-700 focus:shadow-none items-center justify-center rounded-sm py-2.5 w-[90px] text-sub-base font-medium leading-none focus:outline-none"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-violet-700 text-white border border-violet-700 focus:shadow-none items-center justify-center rounded-sm py-2.5 w-[90px] text-sub-base font-medium leading-none focus:outline-none ml-4"
                    disabled={isSaveBtnLoading || isDeleteBtnLoading}
                    onClick={handleTaskSave}
                  >
                    <span className="">Save</span>
                    {isSaveBtnLoading && (
                      <LoadingSpinner variant="button" color="light" />
                    )}
                  </button>
                </div>
              </Dialog.Close>
            </div>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-white focus:bg-violet-600 rounded-full absolute top-[15px] right-[15px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center focus:shadow-[0_0_0_1.5px] focus:outline-none hover:bg-violet-600"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default TaskModal;
