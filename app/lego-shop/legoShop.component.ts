import { Component, OnInit } from '@angular/core';
import { LegoShopSet } from './LegoShopSet';
import { LegoShopService } from './legoShop.service';

@Component({
  template: require('app/lego-shop/legoShop.component.html!text')
})
export class LegoShopComponent implements OnInit {

  legoSets: LegoShopSet[];

  constructor(private legoShopService: LegoShopService) { }

  ngOnInit() {
    this.legoShopService.getLegoSetsHttp().subscribe(legoSets => this.legoSets = legoSets);
  }
}
