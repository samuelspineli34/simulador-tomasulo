import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { UploadArquivoComponent } from './components/upload-arquivo/upload-arquivo.component';
import { SimuladorComponent } from './components/simulador/simulador.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadArquivoComponent,
    SimuladorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
