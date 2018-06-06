/**
 * Created by ugur on 2016-12-27.
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopMainComponent } from './top-main/top-main.component';
import { RegisterComponent } from './register/register.component';

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full',
  },
  { path: 'register', component: RegisterComponent },
  { path: 'topper', component: TopMainComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
