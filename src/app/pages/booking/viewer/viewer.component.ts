import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { DoctorDTO } from "../../../shared/models/DoctorDTO";
import {AvailableAppointmentService} from "../../../shared/services/available-appointment.service";
import {AvailableAppointmentDTO} from "../../../shared/models/AvailableAppointmentDTO";
import {AuthService} from "../../../shared/services/auth.service";
import {AppointmentDTO} from "../../../shared/models/AppointmentDTO";
import {UserDTO} from "../../../shared/models/UserDTO";
import {AppointmentService} from "../../../shared/services/appointment.service";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnChanges {
  @Input() doctorInput?: DoctorDTO;
  @Input() availableAppointments: Array<any> = [];
  user: any;

  constructor(private availableAppService: AvailableAppointmentService, private appointmentService: AppointmentService, private authService: AuthService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['doctorInput'] && this.doctorInput?.id) {
      this.availableAppService.getAvailableAppointmentsByDoctorId(this.doctorInput.id).subscribe(data => {
        this.availableAppointments = data;
      });
    }
  }

  bookAppointment(appointment: AvailableAppointmentDTO) {
    this.saveAppointmentForUser(appointment)
  }

  saveAppointmentForUser(appointment: AvailableAppointmentDTO) {
    const userData = JSON.parse(localStorage.getItem('user') as string);
    const appointmentData: AppointmentDTO = {
      id: '',
      doctorId: appointment.doctorId,
      userId: userData.uid,
      appointmentTime: appointment.availableTime
    };

    console.log(JSON.stringify( appointmentData))

    this.appointmentService.addAppointment(appointmentData).then(() => {
      console.log('Az időpont sikeresen mentve a felhasználóhoz!');
    }).catch(error => {
      console.error('Hiba történt az időpont mentése közben:', error);
    });
  }
}
