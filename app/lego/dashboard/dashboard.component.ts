import { Router } from '@angular/router';
import { LegoSetService } from '../legoSet.service';
import { LegoSet } from '../LegoSet';
import { Component, OnInit } from '@angular/core';


@Component({
    template: require('app/lego/dashboard/dashboard.component.html!text')
})
export class DashboardComponent implements OnInit {

    appTitle: string = 'Lego Angular2 App';
    legoSets: LegoSet[];

    constructor(
        private legoSetService: LegoSetService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.legoSetService.getTop3Sets().subscribe((res) => {
            this.legoSets = res;
        });
    }
}
