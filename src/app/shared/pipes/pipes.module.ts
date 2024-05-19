import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatumFormatPipe} from "./datum-fomat.pipe";



@NgModule({
  declarations: [DatumFormatPipe],
  exports: [DatumFormatPipe],
  imports: [CommonModule]
})
export class PipesModule { }
