import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExplorarComponent } from './explorar.component';

@NgModule({
  declarations: [
    ExplorarComponent
  ],
  exports: [
    ExplorarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ExplorarModule {}