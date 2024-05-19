import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {DoctorDTO} from "../models/DoctorDTO";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class DoctorDAO {
  private collectionName = 'doctors';

  constructor(private firestore: AngularFirestore) {}

  getDoctors(): Observable<DoctorDTO[]> {
    return this.firestore.collection<DoctorDTO>(this.collectionName).valueChanges();
  }

  getDoctorById(id: string): Observable<DoctorDTO | undefined> {
    return this.firestore.collection<DoctorDTO>(this.collectionName).doc(id).valueChanges();
  }

  addDoctor(doctor: DoctorDTO): Promise<void> {
    doctor.id = this.firestore.createId();
    return this.firestore.collection<DoctorDTO>(this.collectionName).doc(doctor.id).set(doctor);
  }

  updateDoctor(doctor: DoctorDTO): Promise<void> {
    return this.firestore.doc<DoctorDTO>(this.collectionName).update(doctor);
  }

  deleteDoctor(id: string): Promise<void> {
    return this.firestore.doc<DoctorDTO>(this.collectionName).delete();
  }
}
