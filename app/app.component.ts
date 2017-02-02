import { LegoSetService } from './legoSet.service';
import { LegoSet } from './LegoSet';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  template: require('app/app.component.html!text')
})
export class AppComponent implements OnInit {

  appTitle: string = 'Lego Angular2 App';
  legoSets: LegoSet[];

  constructor(private legoSetService: LegoSetService) { }

  ngOnInit(): void {
    this.legoSets = this.legoSetService.getLegoSets();
  }

}
