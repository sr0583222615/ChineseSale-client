import { TestBed } from '@angular/core/testing';
import { DonorsService } from './Donors.service';


describe('DonorsService', () => {
  let service: DonorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
