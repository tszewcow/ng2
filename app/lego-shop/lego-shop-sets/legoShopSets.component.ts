import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LegoShopSet } from './../../shared/LegoShopSet';
import { LegoShopService } from './../../shared/legoShop.service';

// Review: table? - a bit old school, where is Bootstrap? :D

@Component({
  template: require('app/lego-shop/lego-shop-sets/legoShopSets.component.html!text'),
  styles: [require('app/lego-shop/lego-shop-sets/legoShopSets.component.css!text')]
})
export class LegoShopSetsComponent implements OnInit {

  legoShopSets: LegoShopSet[];

  constructor(private legoShopService: LegoShopService,
    private route: ActivatedRoute,
    private router: Router) {}


  ngOnInit() {
    this.route.params.subscribe(val => {
        const searchPhrase: string = val['query'];
        this.searchBySearchPhrase(searchPhrase);
    });
  }

  searchBySearchPhrase(searchPhrase: string) {
    this.legoShopService.getLegoSets(searchPhrase)
      .subscribe(legoShopSets => this.legoShopSets = legoShopSets);
  }

  showDetails(legoShopSetId: number): void {
    this.router.navigate(['lego-shop-details', legoShopSetId]);
  }
}
