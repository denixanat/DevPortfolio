import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  exports: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})

export class WelcomeModule { }
