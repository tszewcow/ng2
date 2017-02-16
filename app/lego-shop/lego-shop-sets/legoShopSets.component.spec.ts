/* tslint:disable:no-unused-variable */

import { ComponentFixture } from '@angular/core/testing/component_fixture';
import { TestBed, async } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { Type } from '@angular/core';
import {
    BaseRequestOptions,
    HttpModule,
    Http,
    Response,
    ResponseOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LegoShopSetsComponent } from './legoShopSets.component';
import { LegoShopService } from './../../shared/legoShop.service';

describe('Component: LegoShop', function () {
  let fixture: ComponentFixture<LegoShopSetsComponent>;
  let component: LegoShopSetsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [LegoShopSetsComponent],
      providers: [
        LegoShopService,
        {
          provide: Http,
          useFactory: (mockBackend: MockBackend, options: BaseRequestOptions) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LegoShopSetsComponent as Type<LegoShopSetsComponent>);
      component = fixture.componentInstance;
    });
  }));

  it('should instantiate component', () => {
    fixture.detectChanges(); // triggers LegoShopComponent.ngOnInit()
    expect(component instanceof LegoShopSetsComponent).toBe(true, 'should create LegoShopSetsComponent');
  });

  it('should render info, that table is empty', () => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Result table is empty.');
  });
});
