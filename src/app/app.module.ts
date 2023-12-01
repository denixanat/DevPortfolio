import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PerfilinfoService } from './perfilinfo.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { AboutComponent } from './Components/about/about.component';
import { NavbarModule } from './navbar/navbar.module';
import { ExplorarModule } from './explorar/explorar.module';
import { PerfilModule } from './perfil/perfil.module';
import { WelcomeModule } from './welcome/welcome.module';
import { FormsModule } from '@angular/forms';
import { CommunicationService } from './communication.service';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NavbarModule,
    ExplorarModule,
    PerfilModule,
    WelcomeModule,
  ],
  providers: [PerfilinfoService,CommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
