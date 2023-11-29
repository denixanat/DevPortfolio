import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { ChunkPipe } from './chunk.pipe';

@NgModule({
  declarations: [
    PerfilComponent,
    ChunkPipe
  ],
  exports: [
    PerfilComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PerfilModule { }
