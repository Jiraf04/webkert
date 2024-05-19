import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AvailableAppointmentDAO} from "../daos/AvailableAppointmentDAO";
import {AvailableAppointmentDTO} from "../models/AvailableAppointmentDTO";

@Injectable({
  providedIn: 'root'
})
export class AvailableAppointmentService {
  constructor(private availableAppointmentDAO: AvailableAppointmentDAO) {}

  getAvailableAppointments(): Observable<AvailableAppointmentDTO[]> {
    return this.availableAppointmentDAO.getAvailableAppointments();
  }

  getAvailableAppointmentsByDoctorId(doctorId: string): Observable<AvailableAppointmentDTO[]> {
    return this.availableAppointmentDAO.getAvailableAppointmentsByDoctorId(doctorId);
  }

  addAvailableAppointment(availableAppointment: AvailableAppointmentDTO): Promise<void> {
    return this.availableAppointmentDAO.addAvailableAppointment(availableAppointment);
  }

  updateAvailableAppointment(availableAppointment: AvailableAppointmentDTO): Promise<void> {
    return this.availableAppointmentDAO.updateAvailableAppointment(availableAppointment);
  }

  deleteAvailableAppointment(doctorId: string, availableTime: string): Promise<void> {
    return this.availableAppointmentDAO.deleteAvailableAppointment(doctorId, availableTime);
  }
}
