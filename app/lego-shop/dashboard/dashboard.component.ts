import { ActivatedRoute, Router } from '@angular/router';
import { LegoShopService } from '../../shared/legoShop.service';
import { LegoShopSet } from '../../shared/LegoShopSet';
import { Component } from '@angular/core';


@Component({
    template: require('app/lego-shop/dashboard/dashboard.component.html!text')
})
export class DashboardComponent {

    appTitle: string = 'Lego Angular2 App';
    legoShopSets: LegoShopSet[];

    constructor(
        private legoShopService: LegoShopService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        route.params.subscribe(val => {
            this.legoShopService.getTop3Sets().subscribe((res) => {
                this.legoShopSets = res;
            });
        });
    }
}
