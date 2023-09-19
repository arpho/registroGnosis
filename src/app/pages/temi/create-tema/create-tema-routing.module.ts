import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTemaPage } from './create-tema.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTemaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTemaPageRoutingModule {}
