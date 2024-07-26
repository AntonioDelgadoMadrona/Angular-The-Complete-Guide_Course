import { Component, inject, Input } from "@angular/core";

import { dummyTasks } from "./dummy-tasks";
import { type IUser } from "../user/user.model";
import { INewTaskData } from "./task/task.model";
import { TasksService } from "./tasks.service";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.css",
})
export class TasksComponent {
  // @Input({ required: true }) userId!: string;
  // @Input({ required: true }) name?: string;
  @Input({ required: true }) selectedUser!: IUser;
  tasks = [...dummyTasks];
  // Si damos un valor por defecto no es necesario asignar un tipo, incluso no recomendado
  isAddingTask = false;
  // De esta manera creamos una instancia privada (solo usable aqui) desde TasksService
  // De la siguiente manera crearíamos una instancia en este compnente, pero si en otro lugar se hace lo mismo
  // se crearían instancias separadas (con distintos datos y demás) por lo que esto no es válido. POO...
  // private tasksService = new TasksService();

  // Así se hace y definiendo en el service el decorator @Injectable()
  constructor(private tasksService: TasksService) {}
  // La alternativa más moderna y mejor es:
  // La siguiente línea hace lo mismo que la anterior
  private tasksService2 = inject(TasksService);

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.selectedUser.id);
  }

  onCompleteTask(taskId: string) {
    this.tasksService.removeTask(taskId);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }

  onAddTask(taskData: INewTaskData) {
    this.tasksService2.addTask(taskData, this.selectedUser.id);
    this.isAddingTask = false;
  }
}
