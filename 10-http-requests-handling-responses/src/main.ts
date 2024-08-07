import { bootstrapApplication } from "@angular/platform-browser";

import { AppComponent } from "./app/app.component";
import {
  HTTP_INTERCEPTORS,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from "@angular/common/http";

// Interceptor class
import { LoggingInterceptorClass } from "./interceptor-class-example";
import { tap } from "rxjs";

// Mediante este interceptor podemos registrar cada interaccion con la API
// Esto es ideal para controlar los metodos como la autenticacion de rutas
// Esto puede definirse en un file aparte
function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  // const req = request.clone({
  //   headers: request.headers.set("X-DEBUG", "TESTING"),
  // });
  console.log("Outgoing Request ", request);
  return next(request).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          console.log("Incoming Response");
          console.log(event.status);
          console.log(event.body);
        }
      },
    })
  );
}

bootstrapApplication(AppComponent, {
  // Para utilizar la dependencia HttpClient tenemos que proveerla en main o app.module
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
  // Para utilizar un Class-based interceptor
  // providers: [
  //   provideHttpClient(withInterceptorsFromDi()),
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: LoggingInterceptorClass,
  //     multi: true,
  //   },
  // ],
}).catch((err) => console.error(err));
