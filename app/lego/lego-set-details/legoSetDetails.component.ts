import { LegoSet, Status } from './../LegoSet';
import { LegoSetService } from './../legoSet.service';
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
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        let id: number = +this.route.snapshot.params['legoSetId'];

        if (id !== undefined) {
            let foundLegoSet: LegoSet = this.legoSetService.findOne(id);
            if (foundLegoSet) {
                this.currentLegoSet = foundLegoSet;
            } else {
                this.router.navigate(['lego-set-details']);
            }
        }
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
