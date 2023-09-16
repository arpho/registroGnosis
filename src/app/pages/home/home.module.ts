import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';
import { UserModule } from 'src/app/modules/user/user.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    UserModule,
    DynamicFormModule,
    TranslateModule,
  ],
  declarations: []
})
export class HomePageModule { }
