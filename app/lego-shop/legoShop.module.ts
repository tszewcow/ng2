import { LegoShopSetsComponent } from './lego-shop-sets/legoShopSets.component';
import { LegoShopDetailsComponent } from './lego-shop-details/legoShopDetails.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LegoShopService } from './../shared/legoShop.service';
import { LegoShopOnlineService } from './../shared/legoShopOnline.service';
import { LegoShopOfflineService } from './../shared/legoShopOffline.service';
import { RouterModule } from '@angular/router';
import { Provider, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { environment } from './../_env/environment';


const getLegoShopServiceProvider = (): Provider => {
    if (environment.online) {
        return { provide: LegoShopService, useClass: LegoShopOnlineService };
    } else {
        return { provide: LegoShopService, useClass: LegoShopOfflineService };
    }
};

@NgModule({
    imports: [CommonModule, RouterModule, HttpModule],
    declarations: [LegoShopSetsComponent, LegoShopDetailsComponent, DashboardComponent],
    exports: [ ],
    providers: [getLegoShopServiceProvider()]
})
export class LegoShopModule {
}
