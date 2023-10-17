import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from 'pages/about/about.component';
import { HomeComponent } from 'pages/home/home.component';
import { ExplorarComponent } from './explorar/explorar.component';

const routes: Routes = [
{path: "home", component: HomeComponent},
{path: "about", component: AboutComponent},
{path: "explorar", component: ExplorarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
