import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListTemiPageRoutingModule } from './list-temi-routing.module';

import { ListTemiPage } from './list-temi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListTemiPageRoutingModule
  ],
  declarations: [ListTemiPage]
})
export class ListTemiPageModule {}
