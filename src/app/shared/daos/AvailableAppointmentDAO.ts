import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {AvailableAppointmentDTO} from "../models/AvailableAppointmentDTO";

@Injectable({
  providedIn: 'root'
})
export class AvailableAppointmentDAO {
  private collectionName = 'availableAppointments';

  constructor(private firestore: AngularFirestore) {}

  getAvailableAppointments(): Observable<AvailableAppointmentDTO[]> {
    return this.firestore.collection<AvailableAppointmentDTO>(this.collectionName).valueChanges();
  }

  getAvailableAppointmentsByDoctorId(doctorId: string): Observable<AvailableAppointmentDTO[]> {
    return this.firestore.collection<AvailableAppointmentDTO>('availableAppointments', ref =>
      ref.where('doctorId', '==', doctorId).orderBy('availableTime', 'asc')
    ).valueChanges();
  }


  addAvailableAppointment(availableAppointment: AvailableAppointmentDTO): Promise<void> {
    availableAppointment.id = this.firestore.createId();
    return this.firestore.collection<AvailableAppointmentDTO>(this.collectionName).doc(availableAppointment.id).set(availableAppointment);
  }

  updateAvailableAppointment(availableAppointment: AvailableAppointmentDTO): Promise<void> {
    return this.firestore.doc<AvailableAppointmentDTO>(this.collectionName).update(availableAppointment);
  }

  async deleteAvailableAppointment(doctorId: string, availableTime: string): Promise<void> {
    const collectionRef: AngularFirestoreCollection<AvailableAppointmentDTO> = this.firestore.collection<AvailableAppointmentDTO>('availableAppointments', ref =>
      ref.where('doctorId', '==', doctorId)
        .where('availableTime', '==', availableTime)
    );

    try {
      const querySnapshot = await collectionRef.get().toPromise();
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      } else {
        console.error('Query snapshot is undefined.');
      }
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }
}
