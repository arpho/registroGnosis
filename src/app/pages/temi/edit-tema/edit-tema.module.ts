import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTemaPageRoutingModule } from './edit-tema-routing.module';

import { EditTemaPage } from './edit-tema.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTemaPageRoutingModule
  ],
  declarations: [EditTemaPage]
})
export class EditTemaPageModule {}
