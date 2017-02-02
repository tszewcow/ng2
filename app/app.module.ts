import { AppRoutingModule } from './app-routing.module';
import { LegoModule } from './lego/lego.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, LegoModule, AppRoutingModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {
}
