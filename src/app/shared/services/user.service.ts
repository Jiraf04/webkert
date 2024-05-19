import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {UserDAO} from "../daos/UserDAO";
import {UserDTO} from "../models/UserDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private userDAO: UserDAO) {}

  getUsers(): Observable<UserDTO[]> {
    return this.userDAO.getUsers();
  }

  getUserById(id: string): Observable<UserDTO | undefined> {
    return this.userDAO.getUserById(id);
  }

  addUser(user: UserDTO): Promise<void> {
    return this.userDAO.addUser(user);
  }

  updateUser(user: UserDTO): Promise<void> {
    return this.userDAO.updateUser(user);
  }

  deleteUser(id: string): Promise<void> {
    return this.userDAO.deleteUser(id);
  }
}
