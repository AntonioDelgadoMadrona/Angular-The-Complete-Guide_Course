import { Component, signal, inject, DestroyRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, throwError } from "rxjs";

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
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  // Este ciclo de vida es ideal para implementar Http methods
  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<{ places: Place[] }>("http://localhost:3000/places", {
        // Mediante ese observe option: response decimos que queremos recibir el clásico response
        observe: "response", // observe: 'events' es otra opcion
      })
      // El .pipe es un 'interceptor' antes del subscribe que podemos utilizar
      // .pipe(
      //   map((response) => response.body?.places), // El subscribe next recibiría 'places'
      //   catchError((error) => // Mediante este catchError podemos captar el error y controlar el error. El subscribe error recibiría el error
      //     throwError(() => new Error("Something went wrong fetching the available places. Please try again later."))
      //   )
      // )
      // El subscribe sería como el .then solo que hay que destruirlo despues (opcional e ideal)
      .subscribe({
        next: (response) => {
          console.log(response.body?.places);
          this.places.set(response.body?.places);
        },
        error: (error) => {
          console.log(error);
          this.error.set("Something went wrong fetching the available places. Please try again later.");
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
    this.httpClient
      .put("http://localhost:3000/user-places", {
        placeId: selectedPlace.id,
      })
      .subscribe({
        next: (response) => console.log(response),
      });
  }
}
