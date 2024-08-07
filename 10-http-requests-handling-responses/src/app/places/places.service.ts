import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap, throwError } from "rxjs";

import { Place } from "./place.model";
import { ErrorService } from "../shared/error.service";

// Un servicio funciona similar a un componente
// Donde centralizar la interaccion con API y tener lo métodos lo más aislados posibles (private)
@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  // Injectamos la dependencia para ser usada
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      "http://localhost:3000/places",
      "Something went wrong fetching the available places. Please try again later."
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      "http://localhost:3000/user-places",
      "Something went wrong fetching your favourite places. Please try again later."
    ).pipe(
      tap({
        next: (userPlaces: Place[]) => this.userPlaces.set(userPlaces),
      })
    );
  }

  addPlaceToUserPlaces(selectedPlace: Place) {
    const prevPlaces = this.userPlaces();

    if (!prevPlaces.some((place) => place.id == selectedPlace.id)) {
      this.userPlaces.set([...prevPlaces, selectedPlace]);
    }

    return this.httpClient
      .put("http://localhost:3000/user-places", {
        placeId: selectedPlace.id,
      })
      .pipe(
        catchError(() => {
          this.userPlaces.set(prevPlaces); // SI ha ocurrido algun error, eliminamos el selectedPlace
          this.errorService.showError("Failed to store selected place");
          return throwError(() => new Error("Failed to store selected place"));
        })
      );
  }

  removeUserPlace(selectedPlace: Place) {
    const prevPlaces = this.userPlaces();

    if (prevPlaces.some((place) => place.id == selectedPlace.id)) {
      this.userPlaces.set(prevPlaces.filter((place) => place.id !== selectedPlace.id));
    }

    return this.httpClient.delete("http://localhost:3000/user-places/" + selectedPlace.id).pipe(
      catchError(() => {
        this.userPlaces.set(prevPlaces); // SI ha ocurrido algun error, eliminamos el selectedPlace
        this.errorService.showError("Failed to remove the selected place");
        return throwError(() => new Error("Failed to remove the selected place"));
      })
    );
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((resData) => resData.places),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
