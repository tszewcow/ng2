import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LegoShopSet } from './LegoShopSet';
import { LegoShopService } from './legoShop.service';

@Component({
  template: require('app/lego-shop/legoShop.component.html!text')
})
export class LegoShopComponent implements OnInit {

  legoShopSets: LegoShopSet[];

  constructor(private legoShopService: LegoShopService,
    private router: Router) {
  }

  ngOnInit() {
    this.legoShopService.getLegoSetsHttp().subscribe((legoShopSets) =>
      this.legoShopSets = legoShopSets);
  }

  showDetails(legoShopSetId: number): void {
    this.router.navigate(['lego-shop-details', legoShopSetId]);
  }
}
