import { Component, EventEmitter, Input, Output } from "@angular/core";

import { type ITask } from "./task.model";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrl: "./task.component.css",
})
export class TaskComponent {
  @Input({ required: true }) task!: ITask;
  @Output() complete = new EventEmitter<string>();

  onCompleteTask() {
    this.complete.emit(this.task.id);
  }
}
