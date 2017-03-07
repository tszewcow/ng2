import { ActivatedRoute, Router } from '@angular/router';
import { LegoShopService } from '../../shared/legoShop.service';
import { LegoShopSet } from '../../shared/LegoShopSet';
import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/mergeMap';

@Component({
    template: require('app/lego-shop/dashboard/dashboard.component.html!text')
})
export class DashboardComponent implements OnInit {

    appTitle: string = 'Lego Angular2 App';
    legoShopSets: LegoShopSet[];

    constructor(
        private legoShopService: LegoShopService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params
            .flatMap(val => this.legoShopService.getTop3Sets())
            .subscribe((res) => {
                this.legoShopSets = res;
            });
    }

}
