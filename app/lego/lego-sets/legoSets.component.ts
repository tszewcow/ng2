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
        this.legoSetService.getLegoSets().subscribe((res) => {
            this.legoSets = res;
        });
    }

    editSet(id: number): void {
        this.router.navigate(['lego-set-details', id]);
    }

    deleteSet(id: number) {
        this.legoSetService.delete(id).subscribe((res) => {
            this.legoSetService.getLegoSets().subscribe((data) => {
                this.legoSets = data;
            });
        });
    }

}
