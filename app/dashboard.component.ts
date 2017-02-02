import { LegoSetService } from './legoSet.service';
import { LegoSet } from './LegoSet';
import { Component, OnInit } from '@angular/core';


@Component({
    template: require('app/dashboard.component.html!text');
})
export class DashboardComponent implements OnInit {

    legoSets: LegoSet[];

    constructor(private legoSetService: LegoSetService) { }

    ngOnInit(): void {
        this.legoSets = this.legoSetService.getTop3Sets();
    }
}
