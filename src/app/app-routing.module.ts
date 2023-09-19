import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { configs } from './configs/configs';
import { AuthGuard } from './modules/user/services/authguard';
import { ExpirationTimeGuard } from './modules/user/services/expiration-time-guard.service';
import { RoleGuardService } from './modules/user/services/role-guards.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  

  {path:"users",
  
  loadChildren:()=>import('./modules/user/user.module').then(m=>m.UserModule)
},


  {
    path: 'customers',
    canActivate:[AuthGuard,RoleGuardService],
    data:{maximumRoleLevel:2,locked:configs.locked},
    loadChildren: () => import('./pages/customers/list/customers/customers.module').then( m => m.CustomersPageModule)
  },
  {
    path: 'update-customer',
    canActivate:[AuthGuard],
    data:{maximumRoleLevel:2,
    locked:configs.locked},
    loadChildren: () => import('./pages/customers/edit/update-customer/update-customer.module').then( m => m.UpdateCustomerPageModule)
  },
  {
    path: 'new-customer',
    canActivate:[AuthGuard,RoleGuardService],
    data:{maximumRoleLevel:2,locked:configs.locked},
    loadChildren: () => import('./pages/customers/create/new-customer/new-customer.module').then( m => m.NewCustomerPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },

  {
    path: 'create',
    loadChildren: () => import('./pages/temi/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'list-temi',
    loadChildren: () => import('./pages/temi/list-temi/list-temi.module').then( m => m.ListTemiPageModule)
  },
  {
    path: 'create-tema',
    loadChildren: () => import('./pages/temi/create-tema/create-tema.module').then( m => m.CreateTemaPageModule)
  },
  {
    path: 'edit-tema',
    loadChildren: () => import('./pages/temi/edit-tema/edit-tema.module').then( m => m.EditTemaPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
