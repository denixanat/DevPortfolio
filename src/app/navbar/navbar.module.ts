// navbar.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from '../app-routing.module';
import { NavbarComponent } from './navbar.component';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports:[
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule to the imports array
    AppRoutingModule
  ]
})
export class NavbarModule { }
