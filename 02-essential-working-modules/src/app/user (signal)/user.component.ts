import { Component, computed, signal, input, output } from "@angular/core";
import { DUMMY_USERS } from "../dummy-users";

const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: "app-user",
  standalone: true,
  imports: [],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.css",
})
// Es como una clase, pero particular de Angular
export class UserComponent {
  // Con esto definimos que vamos a recibir una prop desde un padre
  // Mediante el required podemos configurar que de un error si la prop no es pasada
  id = input.required<string>();
  avatar = input.required<string>();
  name = input.required<string>();

  // Con esto definimos que vamos a "exportar" un evento al padre
  // A diferencia de los inputs, esto no es un signal. Solo un event emmitter
  select = output<string>();

  // Mediante un computed value evitamos tener logica en el HTML
  imagePath = computed(() => {
    return "assets/users" + this.avatar();
  });

  onSelectUser() {
    this.select.emit(this.id());
  }
}
