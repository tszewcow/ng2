import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: require('app/app.component.html!text')
})
export class AppComponent {
  isCollapsed: boolean = true;
}
