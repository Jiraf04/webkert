import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {UserComponent} from "./user.component";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatLine} from "@angular/material/core";
import {PipesModule} from "../../shared/pipes/pipes.module";


@NgModule({
  declarations: [
    UserComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatListModule,
    MatCardModule,
    MatLine,
    PipesModule
  ]
})
export class UserModule { }
