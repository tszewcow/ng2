import { LegoShopSetsComponent } from './lego-shop-sets/legoShopSets.component';
import { LegoShopDetailsComponent } from './lego-shop-details/legoShopDetails.component';
import { LegoShopService } from './../shared/legoShop.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';


@NgModule({
    imports: [CommonModule, RouterModule, HttpModule],
    declarations: [LegoShopSetsComponent, LegoShopDetailsComponent],
    exports: [ ],
    providers: [LegoShopService]
})
export class LegoShopModule {
}
