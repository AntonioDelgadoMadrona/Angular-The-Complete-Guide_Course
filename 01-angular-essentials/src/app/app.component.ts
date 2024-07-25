// DEPENDENCIES
import { Component } from "@angular/core";
// import { NgFor, NgIf } from "@angular/common";

// COMPONENTS
import { HeaderComponent } from "./header/header.component";
import { UserComponent } from "./user/user.component";
import { TasksComponent } from "./tasks/tasks.component";
import { DUMMY_USERS } from "./dummy-users";

// Esto es un decorador, cada componente tiene que ir acompañado del mismo
@Component({
  selector: "app-root", // Es el nombre que se le da al componente para ser cargado en otras partes
  standalone: true, // Define que es un componente que se vale por si solo y no necesita de otro para ser ejecutado
  imports: [HeaderComponent, UserComponent, TasksComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  users = DUMMY_USERS;
  selectedUserId = "u1";

  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserId);
  }

  onSelectUser(id: string) {
    this.selectedUserId = id;
  }
}
