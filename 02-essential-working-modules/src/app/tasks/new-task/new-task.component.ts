import { Component, EventEmitter, Output } from "@angular/core";

import { type INewTaskData } from "../task/task.model";

@Component({
  selector: "app-new-task",
  templateUrl: "./new-task.component.html",
  styleUrl: "./new-task.component.css",
})
export class NewTaskComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<INewTaskData>();
  enteredTitle = "";
  enteredSummary = "";
  enteredDate = "";

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.add.emit({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      date: this.enteredDate,
    });
  }
}
