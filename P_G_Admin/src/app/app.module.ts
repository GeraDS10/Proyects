import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeluqueriaComponent } from './peluqueria/peluqueria.component';
import { GuarderiaComponent } from './guarderia/guarderia.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { EditarValorPeluqueriaComponent } from './editar-valor-peluqueria/editar-valor-peluqueria.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PeluqueriaComponent,
    GuarderiaComponent,
    HomeComponent,
    EditarValorPeluqueriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
