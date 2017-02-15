import { LegoSet, Status } from './../LegoSet';
import { LegoSetService } from './../legoSet.service';
import { LegoShopService } from './../../shared/legoShop.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    template: require('app/lego/lego-set-details/legoSetDetails.component.html!text')
})
export class LegoSetDetailsComponent {

    currentLegoSet: LegoSet = new LegoSet();
    statuses: string[] = [Status[Status.New], Status[Status.Used]];

    constructor(
        private legoSetService: LegoSetService,
        private legoShopService: LegoShopService,
        private route: ActivatedRoute,
        private router: Router
    ) {

        route.params.subscribe(val => {
            let legoSetId: number = +this.route.snapshot.params['legoSetId'];
            let legoShopSetId: string = this.route.snapshot.params['legoShopSetId'];

            // TODO error handling, when both params nonempty
            if (legoShopSetId) {
                this.showLegoSetDetailsByLegoShopSetId(legoShopSetId);
            }

            if (legoSetId !== undefined && !isNaN(legoSetId)) {
                this.showLegoSetDetailsById(legoSetId);
            }
        });
    }

    showLegoSetDetailsByLegoShopSetId(legoShopSetId: string) {
        this.legoShopService.findOneHttp(legoShopSetId).subscribe((legoShopSet) => {
            this.currentLegoSet = new LegoSet();
            this.currentLegoSet.externalId = legoShopSet.set_id;
            this.currentLegoSet.name = legoShopSet.descr;
            this.currentLegoSet.imagePath = legoShopSet.img_tn;
            this.currentLegoSet.status = Status[Status.New];
        }, (error) => {
            console.error(error.statusText);
            this.router.navigate(['dashboard']);
        });
    }

    showLegoSetDetailsById(legoSetId: number) {
        this.legoSetService.findOneHttp(legoSetId).subscribe((res) => {
            this.currentLegoSet = res;
        }, (error) => {
            console.error(error.statusText);
            this.router.navigate(['lego-set-details']);
        });
    }

    onStatusChange(newValue: string): void {
        this.currentLegoSet.status = newValue;
    }

    save(): void {
        if (this.currentLegoSet.id === undefined) {
            this.legoSetService.addHttp(this.currentLegoSet)
                .subscribe(res => this.router.navigate(['lego-sets']));
        } else {
            this.legoSetService.editHttp(this.currentLegoSet)
                .subscribe(res => this.router.navigate(['lego-sets']));
        }
    }
}
