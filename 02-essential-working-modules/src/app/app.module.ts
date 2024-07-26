import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { UserComponent } from "./user/user.component";

import { SharedModule } from "./shared/shared.module";
import { TasksModule } from "./tasks/tasks.module";

// Al trabajar por modules hay que configurar el ngModule
// Al ser el root module hay que importar los modulos generales, los modulos de componentes...
@NgModule({
  declarations: [AppComponent, HeaderComponent, UserComponent], // Todos los componentes que vayan a ser utilizados deben ser importados aquii (los no standalone)
  bootstrap: [AppComponent], // Aqui definimos el root component segun el arbol
  imports: [BrowserModule, SharedModule, TasksModule], // Todos los componentes que vayan a ser utilizados deben ser importados aquii (los standalone), junto con modules de config o modules que agrupen otros componentes
})
export class AppModule {}
