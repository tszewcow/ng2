import { LegoSet, Status } from './../LegoSet';
import { LegoSetService } from './../legoSet.service';
import { LegoShopService } from './../../shared/legoShop.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
    template: require('app/lego/lego-set-details/legoSetDetails.component.html!text')
})
export class LegoSetDetailsComponent implements OnInit {

    currentLegoSet: LegoSet = new LegoSet();
    statuses: string[] = [Status[Status.New], Status[Status.Used]];

    constructor(
        private legoSetService: LegoSetService,
        private legoShopService: LegoShopService,
        private route: ActivatedRoute,
        private router: Router
    ) {}


    ngOnInit() {
        this.route.params.subscribe(val => {
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

    private navigateToErrorHandler(toPath: string): (error: any) => void {
        return (error) => {
                console.error(error.statusText);
                this.router.navigate([toPath]);
            };
    }

    showLegoSetDetailsByLegoShopSetId(legoShopSetId: string) {
        this.legoShopService.findOne(legoShopSetId)
            .subscribe((legoShopSet) => {
                this.currentLegoSet = <LegoSet>{
                    externalId: legoShopSet.set_id,
                    name: legoShopSet.descr,
                    imagePath: legoShopSet.img_tn,
                    status: Status[Status.New]
                };
            }, this.navigateToErrorHandler('dashboard'));
    }

    showLegoSetDetailsById(legoSetId: number) {
        this.legoSetService.findOne(legoSetId)
            .subscribe((res) => {
                this.currentLegoSet = res;
            }, this.navigateToErrorHandler('lego-set-details'));
    }

    onStatusChange(newValue: string): void {
        this.currentLegoSet.status = newValue;
    }

    save(): void {
        this.legoSetService.save(this.currentLegoSet)
            .subscribe(res => this.router.navigate(['lego-sets']));
    }
}
