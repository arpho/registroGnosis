import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTemiPage } from './list-temi.page';

const routes: Routes = [
  {
    path: '',
    component: ListTemiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListTemiPageRoutingModule {}
