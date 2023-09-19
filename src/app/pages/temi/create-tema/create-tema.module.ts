import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTemaPageRoutingModule } from './create-tema-routing.module';

import { CreateTemaPage } from './create-tema.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTemaPageRoutingModule
  ],
  declarations: [CreateTemaPage]
})
export class CreateTemaPageModule {}
