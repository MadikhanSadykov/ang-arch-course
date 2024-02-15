import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import {SharedModule} from "@app/pages/demo/pages/shared/shared.module";
import {StylesModule} from "@app/pages/demo/pages/styles/styles.module";


@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    SharedModule,
    StylesModule
  ]
})
export class DemoModule { }
