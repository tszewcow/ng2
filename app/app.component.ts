import { LegoSet, Status } from './LegoSet';
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `<h1>{{appTitle}}</h1>
      <h2>{{legoSet.name}} Lego Set Details</h2>
      <div><label>Id: </label>{{legoSet.id}}</div>
      <div><label>ExternalId: </label>{{legoSet.externalId}}</div>
      <div><label>version: </label>{{legoSet.version}}</div>
      <div><label>Name: </label>{{legoSet.name}}</div>
      <div><label>Status: </label>{{legoSet.status}}</div>
      <div><label>Comment: </label>{{legoSet.comment}}</div>
  `,
} as Component)
export class AppComponent {
  appTitle: string = 'Lego Angular2 App';
  legoSet: LegoSet = {
    id: 1,
    externalId: 'd99ae2c4-e2fa-11e6-bf01-fe55135034f3',
    version: 1,
    name: 'set name',
    status: Status[Status.New],
    comment: 'N/A'
  };
}
