export class Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;

  constructor() {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.status = '';
    this.priority = '';
  }
}
