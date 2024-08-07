import { Component, signal, inject, DestroyRef } from "@angular/core";
import { PlacesService } from "../places.service";

import { Place } from "../place.model";
import { PlacesComponent } from "../places.component";
import { PlacesContainerComponent } from "../places-container/places-container.component";

@Component({
  selector: "app-available-places",
  standalone: true,
  templateUrl: "./available-places.component.html",
  styleUrl: "./available-places.component.css",
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal("");

  // Injectamos la dependencia para ser usada
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);

  // Este ciclo de vida es ideal para implementar Http methods
  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (places: Place[]) => {
        this.places.set(places);
      },
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

  onSelectPlace(selectedPlace: Place) {
    const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace).subscribe({
      next: (resData) => console.log(resData),
    });

    // Destruir el subscribe es buena practica
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
