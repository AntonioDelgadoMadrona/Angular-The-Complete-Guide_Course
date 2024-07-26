import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";

// Esta es la diferencia al trabajar por modules, hay que cambiar este file
platformBrowserDynamic().bootstrapModule(AppModule);
