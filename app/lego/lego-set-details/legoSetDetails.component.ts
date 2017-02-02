import { LegoSet, Status } from './../LegoSet';
import { LegoSetService } from './../legoSet.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    template: require('app/lego/lego-set-details/legoSetDetails.component.html!text')
})
export class LegoSetDetailsComponent implements OnInit {

    currentLegoSet: LegoSet = new LegoSet();
    statuses: string[] = [Status[Status.New], Status[Status.Used]];

    constructor(
        private legoSetService: LegoSetService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            if (params['legoSetId']) {
                let legoSetId: number = +params['legoSetId'];
                let foundLegoSet: LegoSet = this.legoSetService.findOne(legoSetId);
                if (foundLegoSet) {
                    this.currentLegoSet = foundLegoSet;
                } else {
                    this.router.navigate(['lego-set-details']);
                }
            }
        });
    }

    onStatusChange(newValue: string): void {
        this.currentLegoSet.status = newValue;
    }

    save(): void {
        if (this.currentLegoSet.id === undefined) {
            this.legoSetService.add(this.currentLegoSet);
        }
        this.router.navigate(['lego-sets']);
    }

}
