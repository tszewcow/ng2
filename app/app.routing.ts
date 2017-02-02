import { LegoSetDetailsComponent } from './lego/lego-set-details/legoSetDetails.component';
import { LegoSetsComponent } from './lego/lego-sets/legoSets.component';
import { DashboardComponent } from './lego/dashboard/dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


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
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
