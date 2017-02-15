import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LegoShopSet } from './../../shared/LegoShopSet';
import { LegoShopService } from './../../shared/legoShop.service';

@Component({
  template: require('app/lego-shop/lego-shop-sets/legoShopSets.component.html!text')
})
export class LegoShopSetsComponent {

  legoShopSets: LegoShopSet[];

  constructor(private legoShopService: LegoShopService,
    private route: ActivatedRoute,
    private router: Router) {
      route.params.subscribe(val => {
        let searchPhrase: string = val['query'];
        this.searchBySearchPhrase(searchPhrase);
    });
  }

  searchBySearchPhrase(searchPhrase: string) {
    if (searchPhrase) {
      this.legoShopService.getLegoSetsHttp(searchPhrase).subscribe((legoShopSets) =>
        this.legoShopSets = legoShopSets);
    } else {
      this.legoShopService.getLegoSetsHttp().subscribe((legoShopSets) =>
        this.legoShopSets = legoShopSets);
    }
  }

  showDetails(legoShopSetId: number): void {
    this.router.navigate(['lego-shop-details', legoShopSetId]);
  }
}
