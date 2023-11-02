import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';


@NgModule({
  declarations: [
    PerfilComponent
  ],
  exports: [
    PerfilComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PerfilModule { }
