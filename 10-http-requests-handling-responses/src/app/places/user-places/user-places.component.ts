import { Component, signal, inject, DestroyRef } from "@angular/core";

import { PlacesContainerComponent } from "../places-container/places-container.component";
import { PlacesComponent } from "../places.component";
import { Place } from "../place.model";
import { PlacesService } from "../places.service";

@Component({
  selector: "app-user-places",
  standalone: true,
  templateUrl: "./user-places.component.html",
  styleUrl: "./user-places.component.css",
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  // places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal("");

  // Injectamos la dependencia para ser usada
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  // De esta manera conectamos con el signal del service
  places = this.placesService.loadedUserPlaces;

  // Este ciclo de vida es ideal para implementar Http methods
  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.placesService.loadUserPlaces().subscribe({
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    // Destruir el subscribe es buena practica
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onRemovePlace(selectedPlace: Place) {
    const subscription = this.placesService.removeUserPlace(selectedPlace).subscribe();

    // Destruir el subscribe es buena practica
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
