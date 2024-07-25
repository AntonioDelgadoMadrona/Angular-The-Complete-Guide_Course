import { Component, EventEmitter, Input, Output } from "@angular/core";
// Mediante DatePipe podemos cambiar el formato de la fecha. Leer docu. No otras librerias
import { DatePipe } from "@angular/common";

import { type ITask } from "./task.model";
import { CardComponent } from "../../shared/card/card.component";

@Component({
  selector: "app-task",
  standalone: true,
  imports: [CardComponent, DatePipe],
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
