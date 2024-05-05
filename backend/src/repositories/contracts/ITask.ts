export default interface ITask {
  title: string;
  description: string;
  status: "todo" | "inprogress" | "done";
  created_at?: any;
}