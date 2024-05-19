import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserDTO} from "../models/UserDTO";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserDAO {
  private collectionName = 'users';

  constructor(private firestore: AngularFirestore) {}

  getUsers(): Observable<UserDTO[]> {
    return this.firestore.collection<UserDTO>(this.collectionName).valueChanges();
  }

  getUserById(id: string): Observable<UserDTO | undefined> {
    return this.firestore.collection<UserDTO>(this.collectionName).doc(id).valueChanges();
  }

  addUser(user: UserDTO): Promise<void> {
    return this.firestore.collection<UserDTO>(this.collectionName).doc(user.id).set(user);
  }

  updateUser(user: UserDTO): Promise<void> {
    return this.firestore.doc<UserDTO>(this.collectionName).update(user);
  }

  deleteUser(id: string): Promise<void> {
    return this.firestore.doc<UserDTO>(this.collectionName).delete();
  }
}
