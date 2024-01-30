import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeluqueriaComponent } from './peluqueria/peluqueria.component';
import { GuarderiaComponent } from './guarderia/guarderia.component';
import { HomeComponent } from './home/home.component';
import { EditarValorPeluqueriaComponent } from './editar-valor-peluqueria/editar-valor-peluqueria.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'peluqueria', component: PeluqueriaComponent},
  {path:'peluqueria/:id', component: EditarValorPeluqueriaComponent},
  {path:'guarderia', component: GuarderiaComponent},
  {path:'', redirectTo: '', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
