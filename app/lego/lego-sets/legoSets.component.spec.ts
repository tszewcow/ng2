import { Location } from '@angular/common';
import { LegoShopService } from './../../shared/legoShop.service';
import { AppComponent } from './../../app.component';
import { FormsModule } from '@angular/forms';
import { LegoSetDetailsComponent } from './../lego-set-details/legoSetDetails.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { LegoSetService } from './../legoSet.service';
import { LegoSetsComponent } from './legoSets.component';
import { ComponentFixture } from '@angular/core/testing/component_fixture';
import { TestBed, tick, fakeAsync, inject } from '@angular/core/testing';

describe('legoSets Component tests', () => {

    let fixture: ComponentFixture<LegoSetsComponent>;
    let component: LegoSetsComponent;
    let legoSetsServiceMock = {
        getLegoSetsHttp: jasmine.createSpy('setsSpy').and.returnValue(
            Observable.create((observer: Observer<any>) => {
                observer.next([{
                    name: 'set',
                    id: 0
                }]);
            })),
        deleteHttp: jasmine.createSpy('deleteSpy').and.returnValue(
            Observable.create((observer: Observer<any>) => {
                observer.next({ status: 200 });
            })
        )
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule.withRoutes([
                { path: 'lego-set-details/:id', component: LegoSetDetailsComponent }
            ])],
            declarations: [AppComponent, LegoSetsComponent, LegoSetDetailsComponent],
            providers: [{ provide: LegoSetService, useValue: legoSetsServiceMock }, { provide: LegoShopService, useValue: {} }]
        });

        // TestBed.compileComponents();
        TestBed.createComponent(AppComponent);
        fixture = TestBed.createComponent(LegoSetsComponent);
        component = fixture.componentInstance;
    });

    it('should load lego sets on startup', () => {
        // given // when
        fixture.detectChanges();

        // then
        expect(legoSetsServiceMock.getLegoSetsHttp).toHaveBeenCalled();
        expect(component.legoSets).toEqual([{
            name: 'set',
            id: 0
        }]);
    });

    it('should delete lego set', () => {
        // given 
        const id = 0;

        // when
        component.deleteSet(id);

        // then
        expect(legoSetsServiceMock.deleteHttp).toHaveBeenCalledWith(id);
    });

    it('should navigate to details', fakeAsync(inject([Location], (location: Location) => {
        // given
        const id = 0;
        // let location = TestBed.get(Location);

        // when
        component.editSet(id);
        tick();
        fixture.detectChanges();

        // then
        expect(location.path()).toBe('/lego-set-details/0');
    })));
});
