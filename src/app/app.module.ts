import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainComponent } from '../modules/pages/main/main.component';
import {ModalComponent} from "../modules/shared/modal/modal.component";

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [BrowserModule, ModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
