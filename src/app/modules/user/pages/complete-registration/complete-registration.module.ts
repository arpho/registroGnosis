import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteRegistrationPageRoutingModule } from './complete-registration-routing.module';

import { CompleteRegistrationPage } from './complete-registration.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteRegistrationPageRoutingModule,
    DynamicFormModule
  ],
  declarations: [CompleteRegistrationPage],

})
export class CompleteRegistrationPageModule {}
