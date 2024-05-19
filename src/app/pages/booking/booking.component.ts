import {Component, OnInit} from '@angular/core';
import {DoctorDTO} from "../../shared/models/DoctorDTO";
import {DoctorService} from "../../shared/services/doctor.service";
import {Observable} from "rxjs";
import {AvailableAppointmentService} from "../../shared/services/available-appointment.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit{
  doctors?: Array<DoctorDTO>;
  chosenDoctor?: any;
  availableAppointments: Array<any> = [];

  constructor(private doctorService: DoctorService, private availableAppointmentService: AvailableAppointmentService) {
  }
  ngOnInit() {
    this.doctorService.getDoctors().subscribe((data: Array<DoctorDTO>) => {
      this.doctors = data;
    })
  }

  loadAppointments(doctor: DoctorDTO) {
    this.chosenDoctor = doctor;
    this.availableAppointmentService.getAvailableAppointmentsByDoctorId(doctor.id).subscribe(appointments => {
      this.availableAppointments = appointments;
    });
  }

}
