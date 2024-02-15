import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputModule} from "@app/shared/controls/input/input.module";
import {FormFieldModule} from "@app/shared";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputModule,
    FormFieldModule
  ],
  exports: [
    InputModule,
    FormFieldModule
  ]
})
export class ControlsModule { }
