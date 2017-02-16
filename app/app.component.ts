import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app',
  template: require('app/app.component.html!text')
})
export class AppComponent {
  isCollapsed: boolean = true;
  currentSearchPhrase: string;

  constructor(private router: Router) { }

  search(): void {
        if (this.currentSearchPhrase) {
            this.router.navigate(['lego-shop', {query: this.currentSearchPhrase}]);
        } else {
            this.router.navigate(['lego-shop']);
        }
    }
}
