import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import {BookingComponent} from "./booking.component";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import { ListComponent } from './list/list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import { ViewerComponent } from './viewer/viewer.component';
import {MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {DatumFormatPipe} from "../../shared/pipes/datum-fomat.pipe";
import {PipesModule} from "../../shared/pipes/pipes.module";


@NgModule({
  declarations: [
    BookingComponent,
    ListComponent,
    ViewerComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatButton,
    PipesModule
  ]
})
export class BookingModule { }
