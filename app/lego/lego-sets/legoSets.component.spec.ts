import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { LegoSetService } from './../legoSet.service';
import { LegoSetsComponent } from './legoSets.component';
import { ComponentFixture } from '@angular/core/testing/component_fixture';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

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

    let routerMock = {
        navigate: jasmine.createSpy('navigateSpy')
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LegoSetsComponent],
            providers: [{ provide: LegoSetService, useValue: legoSetsServiceMock }, { provide: Router, useValue: routerMock }]
        });

        TestBed.compileComponents();

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

    it('should navigate to details', () => {
        // given
        const id = 0;

        // when
        component.editSet(id);

        // then
        expect(routerMock.navigate).toHaveBeenCalledWith(['lego-set-details', id]);
    });
});
