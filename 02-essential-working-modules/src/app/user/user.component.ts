import { Component, EventEmitter, Input, Output } from "@angular/core";

import { type IUser } from "./user.model";

// Todo lo que empieza con @ se denomina decorator
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.css",
})
// Es como una clase, pero particular de Angular
export class UserComponent {
  // Con este decorator definimos que vamos a recibir una prop desde un padre
  // Mediante el required podemos configurar que de un error si la prop no es pasada
  // @Input({ required: true }) id!: string;
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;
  // @Input({ required: true }) user!: {
  //   id: string;
  //   avatar: string;
  //   name: string;
  // };
  @Input({ required: true }) user!: IUser;
  @Input({ required: true }) selected!: boolean;

  // Con este decorator definimos que vamos a "exportar" un evento al padre
  @Output() selectUser = new EventEmitter<string>();

  get imagePath() {
    return "assets/users/" + this.user.avatar;
  }

  onSelectUser() {
    // Para ejecutar el output decorator tenemos que llamar al emit
    this.selectUser.emit(this.user.id);
  }
}
