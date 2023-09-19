import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTemaPage } from './edit-tema.page';

const routes: Routes = [
  {
    path: '',
    component: EditTemaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTemaPageRoutingModule {}
