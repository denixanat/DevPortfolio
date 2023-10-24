import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExplorarComponent } from './explorar/explorar.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
{path: "home", component: WelcomeComponent},
{path: "explorar", component: ExplorarComponent}, 
{ path: "non-Page", component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
