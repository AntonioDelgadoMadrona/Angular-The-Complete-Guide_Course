import { NgModule } from "@angular/core";

import { CardComponent } from "./card/card.component";

// Es muy util crear modules por tipo de funcionalidad, en este caso la idea es agrupar los "shared components"
@NgModule({
  declarations: [CardComponent],
  exports: [CardComponent], // Es necesario exportar los componentes o modulos que vayan a ser utilizados en otras partes
})
export class SharedModule {}
