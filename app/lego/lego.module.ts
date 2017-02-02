import { LegoSetsComponent } from './lego-sets/legoSets.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LegoSetDetailsComponent } from './lego-set-details/legoSetDetails.component';
import { LegoSetService } from './legoSet.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [DashboardComponent, LegoSetsComponent, LegoSetDetailsComponent],
    exports: [DashboardComponent, LegoSetsComponent, LegoSetDetailsComponent],
    providers: [LegoSetService]
})
export class LegoModule {
}
