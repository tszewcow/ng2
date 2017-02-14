import { Router } from '@angular/router';
import { LegoSet } from '../LegoSet';
import { LegoSetService } from '../legoSet.service';
import { Component, OnInit } from '@angular/core';


@Component({
    template: require('app/lego/lego-sets/legoSets.component.html!text')
})
export class LegoSetsComponent implements OnInit {

    legoSets: LegoSet[];

    constructor(
        private legoSetService: LegoSetService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.legoSetService.getLegoSetsHttp().subscribe((res) => {
            this.legoSets = res;
        });
    }

    editSet(id: number): void {
        this.router.navigate(['lego-set-details', { legoSetId: id }]);
    }

    deleteSet(id: number) {
        this.legoSetService.deleteHttp(id).subscribe((res) => {
            this.legoSetService.getLegoSetsHttp().subscribe((data) => {
                this.legoSets = data;
            });
        });
    }

}
