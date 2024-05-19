import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AppointmentDTO} from "../models/AppointmentDTO";

@Injectable({
  providedIn: 'root'
})
export class AppointmentDAO {
  private collectionName = 'appointments';

  constructor(private firestore: AngularFirestore) {}

  getAppointments(): Observable<AppointmentDTO[]> {
    return this.firestore.collection<AppointmentDTO>(this.collectionName).valueChanges();
  }

  getAppointmentsByUserId(userId: string): Observable<AppointmentDTO[]> {
    return this.firestore.collection<AppointmentDTO>('appointments', ref =>
      ref.where('userId', '==', userId).orderBy('appointmentTime', 'asc')
    ).valueChanges();
  }


  addAppointment(appointment: AppointmentDTO): Promise<void> {
    appointment.id = this.firestore.createId();
    return this.firestore.collection<AppointmentDTO>(this.collectionName).doc(appointment.id).set(appointment);
  }

  updateAppointment(appointment: AppointmentDTO): Promise<void> {
    return this.firestore.doc<AppointmentDTO>(this.collectionName).update(appointment);
  }

  deleteAppointment(id: string): Promise<void> {
    return this.firestore.collection<AppointmentDTO>(this.collectionName).doc(id).delete();
  }
}
