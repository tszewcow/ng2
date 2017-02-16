/* tslint:disable:no-unused-variable */
import {AppComponent} from './app.component';
import {TestBed, async} from '@angular/core/testing';
import {Type} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import {ComponentFixture} from '@angular/core/testing/component_fixture';

describe('AppComponent with TCB', function () {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [AppComponent]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent as Type<AppComponent>);
      component = fixture.componentInstance;
    });
  }));

  it('should instantiate component', () => {
    fixture.detectChanges(); // triggers AppComponent.ngOnInit()
    expect(component instanceof AppComponent).toBe(true, 'should create AppComponent');
  });
});
