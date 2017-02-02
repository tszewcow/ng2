import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: require('app/app.component.html!text')
})
export class AppComponent {

  appTitle: string = 'Lego Angular2 App';
  isCollapsed: boolean = true;
}
