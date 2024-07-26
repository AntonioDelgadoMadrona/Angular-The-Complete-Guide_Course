// DEPENDENCIES
import { Component } from "@angular/core";
// import { NgFor, NgIf } from "@angular/common";

// COMPONENTS
import { DUMMY_USERS } from "./dummy-users";

// Esto es un decorador, cada componente tiene que ir acompañado del mismo
@Component({
  selector: "app-root", // Es el nombre que se le da al componente para ser cargado en otras partes
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
