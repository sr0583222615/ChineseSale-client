import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorManagmentComponent } from './donor-managment.component';

describe('DonorManagmentComponent', () => {
  let component: DonorManagmentComponent;
  let fixture: ComponentFixture<DonorManagmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorManagmentComponent]
    });
    fixture = TestBed.createComponent(DonorManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
