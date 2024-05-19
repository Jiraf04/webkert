import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AppointmentDAO} from "../daos/AppointmentDAO";
import {AppointmentDTO} from "../models/AppointmentDTO";
import {AvailableAppointmentDAO} from "../daos/AvailableAppointmentDAO";
import {AvailableAppointmentService} from "./available-appointment.service";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private appointmentDAO: AppointmentDAO, private availableAppointmentService: AvailableAppointmentService) {}

  getAppointments(): Observable<AppointmentDTO[]> {
    return this.appointmentDAO.getAppointments();
  }

  getAppointmentByUserId(userId: string): Observable<AppointmentDTO[]> {
    return this.appointmentDAO.getAppointmentsByUserId(userId);
  }

  addAppointment(appointment: AppointmentDTO): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.appointmentDAO.addAppointment(appointment)
        .then(() => {
          this.availableAppointmentService.deleteAvailableAppointment(appointment.doctorId, appointment.appointmentTime)
            .then(() => {
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  deleteAppointment(doctorId: string, appointmentTime: string): Promise<void> {
    return this.availableAppointmentService.deleteAvailableAppointment(doctorId, appointmentTime);
  }

  updateAppointment(appointment: AppointmentDTO): Promise<void> {
    return this.appointmentDAO.updateAppointment(appointment);
  }

}
