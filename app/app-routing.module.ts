import { LegoSetDetailsComponent } from './lego/lego-set-details/legoSetDetails.component';
import { LegoSetsComponent } from './lego/lego-sets/legoSets.component';
import { DashboardComponent } from './lego-shop/dashboard/dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { LegoShopSetsComponent } from './lego-shop/lego-shop-sets/legoShopSets.component';
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
        component: LegoShopSetsComponent
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

