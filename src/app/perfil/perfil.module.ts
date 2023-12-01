import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { ChunkPipe } from './chunk.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PerfilComponent,
    ChunkPipe
  ],
  exports: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PerfilModule { }
