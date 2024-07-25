import { Component, EventEmitter, Output } from "@angular/core";
// Cada vez que trabajamos con formularios o inputs tenemos que importar FormsModule para hacer uso de la directivas como ngModel
import { FormsModule } from "@angular/forms";

import { type INewTaskData } from "../task/task.model";

@Component({
  selector: "app-new-task",
  standalone: true,
  imports: [FormsModule],
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
