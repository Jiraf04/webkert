import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {DoctorDTO} from "../../../shared/models/DoctorDTO";
import {DoctorService} from "../../../shared/services/doctor.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, OnChanges {
  chosenDoctor?: DoctorDTO;
  @Input() doctorsInput?: Array<DoctorDTO>;
  @Output() doctorsEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit () {
  }

  ngOnChanges() {
    if (this.doctorsInput && this.doctorsInput.length > 0) {
      this.chosenDoctor = this.doctorsInput[0];
      this.reload();
    }
  }

  reload() {
    this.doctorsEmitter.emit(this.chosenDoctor);
  }
}
