import { TestBed } from '@angular/core/testing';

import { AvailableAppointmentService } from './available-appointment.service';

describe('AvailableAppointmentService', () => {
  let service: AvailableAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
