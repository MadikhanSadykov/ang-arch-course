import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "@app/shared/buttons/button/button.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    ButtonModule
  ]
})
export class ButtonsModule { }
