import { Task } from "./task.entity";

export interface TaskWithState extends Task {
  isViewing: boolean;
  completed: boolean;
}
