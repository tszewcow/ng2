import { LegoShopComponent } from './legoShop.component';
import { LegoShopDetailsComponent } from './lego-shop-details/legoShopDetails.component';
import { LegoShopService } from './legoShop.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';


@NgModule({
    imports: [CommonModule, RouterModule, HttpModule],
    declarations: [LegoShopComponent, LegoShopDetailsComponent],
    exports: [ ],
    providers: [LegoShopService]
})
export class LegoShopModule {
}
