import { LegoSet } from './LegoSet';
import { LegoSetService } from './legoSet.service';
import { Component, OnInit } from '@angular/core';


@Component({
    template: require('app/legoSets.component.html!text');
})
export class LegoSetsComponent implements OnInit {

    legoSets: LegoSet[];

    constructor(private legoSetService: LegoSetService) { }

    ngOnInit(): void {
        this.legoSets = this.legoSetService.getLegoSets();
    }

}
