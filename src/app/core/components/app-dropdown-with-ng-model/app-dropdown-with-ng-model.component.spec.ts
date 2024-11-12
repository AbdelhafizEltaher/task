import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDropdownWithNgModelComponent } from './app-dropdown-with-ng-model.component';

describe('AppDropdownWithNgModelComponent', () => {
  let component: AppDropdownWithNgModelComponent;
  let fixture: ComponentFixture<AppDropdownWithNgModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDropdownWithNgModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDropdownWithNgModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
