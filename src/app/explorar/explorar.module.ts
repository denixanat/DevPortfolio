// explorar.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ExplorarComponent } from './explorar.component';

@NgModule({
  declarations: [
    ExplorarComponent
  ],
  exports: [
    ExplorarComponent
  ],
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule to the imports array
  ]
})
export class ExplorarModule {}
