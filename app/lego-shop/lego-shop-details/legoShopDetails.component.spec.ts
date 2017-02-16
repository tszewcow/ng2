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
import { LegoShopDetailsComponent } from './legoShopDetails.component';
import { LegoShopService } from './../../shared/legoShop.service';

describe('Component: LegoShopDetails', function () {
  let fixture: ComponentFixture<LegoShopDetailsComponent>;
  let component: LegoShopDetailsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [LegoShopDetailsComponent],
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
      fixture = TestBed.createComponent(LegoShopDetailsComponent as Type<LegoShopDetailsComponent>);
      component = fixture.componentInstance;
    });
  }));

  it('should instantiate component', () => {
    fixture.detectChanges(); // triggers LegoShopDetailsComponent.ngOnInit()
    expect(component instanceof LegoShopDetailsComponent).toBe(true, 'should create LegoShopDetailsComponent');
  });
});
