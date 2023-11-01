import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { AboutComponent } from './Components/about/about.component';
import { NavbarModule } from './navbar/navbar.module';
import { ExplorarModule } from './explorar/explorar.module';
import { PerfilModule } from './perfil/perfil.module';
import { WelcomeModule } from './welcome/welcome.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    ExplorarModule,
    PerfilModule,
    WelcomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
