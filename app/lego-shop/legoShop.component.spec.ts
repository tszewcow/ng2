/* tslint:disable:no-unused-variable */

import { ComponentFixture } from '@angular/core/testing/component_fixture';
import { TestBed, async } from '@angular/core/testing';
import { Type } from '@angular/core';
import {
    BaseRequestOptions,
    HttpModule,
    Http,
    Response,
    ResponseOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LegoShopComponent } from './legoShop.component';
import { LegoShopService } from './legoShop.service';

describe('Component: LegoShop', function () {
  let fixture: ComponentFixture<LegoShopComponent>;
  let component: LegoShopComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [LegoShopComponent],
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
      fixture = TestBed.createComponent(LegoShopComponent as Type<LegoShopComponent>);
      component = fixture.componentInstance;
    });
  }));

  it('should instantiate component', () => {
    fixture.detectChanges(); // triggers LegoShopComponent.ngOnInit()
    expect(component instanceof LegoShopComponent).toBe(true, 'should create LegoShopComponent');
  });

  it('should render info, that table is empty', () => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Result table is empty.');
  });
});
