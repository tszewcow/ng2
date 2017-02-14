import { Component, OnInit } from '@angular/core';
import { LegoShopSet } from './../../shared/LegoShopSet';
import { ActivatedRoute, Router } from '@angular/router';
import { LegoShopService } from './../../shared/legoShop.service';

@Component({
    template: require('app/lego-shop/lego-shop-details/legoShopDetails.component.html!text')
})
export class LegoShopDetailsComponent implements OnInit {

    currentLegoShopSet: LegoShopSet = new LegoShopSet();

    constructor(private legoShopService: LegoShopService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        let id: string = this.route.snapshot.params['legoShopSetId'];

        if (id) {
            this.legoShopService.findOneHttp(id).subscribe((res) => {
                this.currentLegoShopSet = res;
            }, (error) => {
                console.error(error.statusText);
            });
        }
    }

    convertToLegoSet(): void {
        this.router.navigate(['lego-set-details', { legoShopSetId: this.currentLegoShopSet.set_id }]);
    }
}
