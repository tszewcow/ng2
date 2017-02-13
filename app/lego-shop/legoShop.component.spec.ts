/* tslint:disable:no-unused-variable */

import { ComponentFixture } from '@angular/core/testing/component_fixture';
import { TestBed, async } from '@angular/core/testing';
import { Type } from '@angular/core';
import { LegoShopComponent } from './legoShop.component';

describe('Component: LegoShop', function () {
  let fixture: ComponentFixture<LegoShopComponent>;
  let component: LegoShopComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ],
      declarations: [LegoShopComponent]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LegoShopComponent as Type<LegoShopComponent>);
      component = fixture.componentInstance;
    });
  }));

  it('should instantiate component', () => {
    fixture.detectChanges(); // triggers LegoShopComponent.ngOnInit()
    expect(component instanceof LegoShopComponent).toBe(true, 'should create LegoShopComponent');
  });

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Placeholder for lego shop');
  });
});
