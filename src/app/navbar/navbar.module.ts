import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    AppRoutingModule
  ]
})
export class NavbarModule { }
