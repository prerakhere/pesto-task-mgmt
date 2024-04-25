interface TaskOptions {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate?: Date;
}

export class Task {
  private id?: string;
  private title = "";
  private description = "";
  private status = TaskStatus.Todo;
  private dueDate: any | null;

  constructor({ title, description, status, dueDate }: TaskOptions) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.dueDate = dueDate;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setStatus(status: TaskStatus) {
    this.status = status;
  }

  setDueDate(dueDate: any) {
    this.dueDate = dueDate;
  }
}