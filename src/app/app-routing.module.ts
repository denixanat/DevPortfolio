import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExplorarComponent } from './explorar/explorar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: "home", component: WelcomeComponent },
  { path: "explorar", component: ExplorarComponent },
  { path: "non-Page", component: WelcomeComponent },
  { path: "perfil", component: PerfilComponent },
  { path: "", redirectTo: "home", pathMatch: "full"},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
