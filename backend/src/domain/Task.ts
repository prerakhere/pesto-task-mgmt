interface TaskAttributes {
  id?: string;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "done";
  created_at?: string;
}

export default class Task {
  private id?: string;
  private title = "";
  private description = "";
  private status = "todo";
  private created_at?: string;

  constructor({ title, description, status, created_at }: TaskAttributes) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.created_at = created_at;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getStatus() {
    return this.status;
  }

  getCreatedAt() {
    return this.created_at;
  }
}