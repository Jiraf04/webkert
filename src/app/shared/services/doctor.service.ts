import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {DoctorDAO} from "../daos/DoctorDAO";
import {DoctorDTO} from "../models/DoctorDTO";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private doctorDAO: DoctorDAO) {}

  getDoctors(): Observable<DoctorDTO[]> {
    return this.doctorDAO.getDoctors();
  }

  getDoctorById(id: string): Observable<DoctorDTO | undefined> {
    return this.doctorDAO.getDoctorById(id);
  }

  addDoctor(doctor: DoctorDTO): Promise<void> {
    return this.doctorDAO.addDoctor(doctor);
  }

  updateDoctor(doctor: DoctorDTO): Promise<void> {
    return this.doctorDAO.updateDoctor(doctor);
  }

  deleteDoctor(id: string): Promise<void> {
    return this.doctorDAO.deleteDoctor(id);
  }
}
