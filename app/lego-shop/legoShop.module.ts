import { LegoShopComponent } from './legoShop.component';
import { LegoShopService } from './legoShop.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';


@NgModule({
    imports: [CommonModule, RouterModule, HttpModule],
    declarations: [LegoShopComponent],
    exports: [ ],
    providers: [LegoShopService]
})
export class LegoShopModule {
}
