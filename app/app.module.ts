import { LegoSetDetailsComponent } from './legoSetDetails.component';
import { LegoSetsComponent } from './legoSets.component';
import { DashboardComponent } from './dashboard.component';
import { LegoSetService } from './legoSet.service';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

const appRoutes: Route[] = [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'lego-sets',
        component: LegoSetsComponent
      },
      {
        path: 'lego-set-details',
        component: LegoSetDetailsComponent
      }
    ];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [AppComponent, DashboardComponent, LegoSetsComponent, LegoSetDetailsComponent],
  bootstrap: [AppComponent],
  providers: [LegoSetService]
})
export class AppModule {
}
