import { Component, EventEmitter, Input, Output } from "@angular/core";

// Todo lo que empieza con @ se denomina decorator
@Component({
  selector: "app-user",
  standalone: true,
  imports: [],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.css",
})
// Es como una clase, pero particular de Angular
export class UserComponent {
  // Con este decorator definimos que vamos a recibir una prop desde un padre
  // Mediante el required podemos configurar que de un error si la prop no es pasada
  @Input({ required: true }) id!: string;
  @Input({ required: true }) avatar!: string;
  @Input({ required: true }) name!: string;

  // Con este decorator definimos que vamos a "exportar" un evento al padre
  @Output() selectUser = new EventEmitter<string>();

  get imagePath() {
    return "assets/users/" + this.avatar;
  }

  onSelectUser() {
    // Para ejecutar el output decorator tenemos que llamar al emit
    this.selectUser.emit(this.id);
  }
}
