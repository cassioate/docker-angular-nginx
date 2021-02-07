import { FormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MessageComponent
  ]
})
export class SharedModule { }
