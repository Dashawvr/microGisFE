import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import {RecordRtcComponent} from './components/record-rtc/record-rtc.component';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    RecordRtcComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    RecordRtcComponent
  ]
})
export class SharedModule {
}
