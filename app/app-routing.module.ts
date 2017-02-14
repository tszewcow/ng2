import { LegoSetDetailsComponent } from './lego/lego-set-details/legoSetDetails.component';
import { LegoSetsComponent } from './lego/lego-sets/legoSets.component';
import { DashboardComponent } from './lego/dashboard/dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { LegoShopComponent } from './lego-shop/legoShop.component';
import { LegoShopDetailsComponent } from './lego-shop/lego-shop-details/legoShopDetails.component';


const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'lego-sets',
        component: LegoSetsComponent
    },
    {
        path: 'lego-set-details',
        component: LegoSetDetailsComponent
    },
    {
        path: 'lego-set-details/:legoSetId',
        component: LegoSetDetailsComponent
    },
    {
        path: 'lego-shop',
        component: LegoShopComponent
    },
    {
        path: 'lego-shop-details/:legoShopSetId',
        component: LegoShopDetailsComponent
    }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

