import { AppRoutingModule } from './app-routing.module';
import { LegoModule } from './lego/lego.module';
import { LegoShopModule } from './lego-shop/legoShop.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, LegoModule, LegoShopModule, AppRoutingModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {
}
