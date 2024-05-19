import {Component, OnDestroy, OnInit} from '@angular/core';
import { AppointmentService } from '../../shared/services/appointment.service';
import { UserDTO } from '../../shared/models/UserDTO';
import { AppointmentDTO } from '../../shared/models/AppointmentDTO';
import {UserService} from "../../shared/services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  username: string = '';
  email: string = '';
  user: any;
  appointments: AppointmentDTO[] = [];
  userSubscription: Subscription | undefined;
  appointmentsSubscription: Subscription | undefined;
  userData: any;

  constructor(private userService: UserService, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user') as string);
    this.userSubscription = this.userService.getUserById(this.userData.uid as string)
      .subscribe((user: UserDTO | undefined) => {
        this.user = user;
      });

    this.appointmentsSubscription = this.appointmentService.getAppointmentByUserId(this.userData.uid)
      .subscribe((appointments: AppointmentDTO[]) => {
        this.appointments = appointments;
      });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.appointmentsSubscription) {
      this.appointmentsSubscription.unsubscribe();
    }
  }
}
