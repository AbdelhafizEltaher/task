import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInputWithNgModelComponent } from './app-input-with-ng-model.component';

describe('AppInputWithNgModelComponent', () => {
  let component: AppInputWithNgModelComponent;
  let fixture: ComponentFixture<AppInputWithNgModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppInputWithNgModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppInputWithNgModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
