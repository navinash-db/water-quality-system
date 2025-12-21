import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard'; 

import { AlertsList } from './modules/alerts/alerts-list/alerts-list';
import { Login } from './modules/auth/login/login';
import { DashboardHome } from './modules/dashboard/dashboard-home/dashboard-home';
import { AddReading } from './modules/readings/add-reading/add-reading';
import { EditReading } from './modules/readings/edit-reading/edit-reading';
import { ListReading } from './modules/readings/list-reading/list-reading';
import { ReportsHome } from './modules/reports/reports-home/reports-home';
import { Settings } from './modules/settings/settings';

export const routes: Routes = [
  // Public Routes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },

  // Protected Routes (Require Login)
  { 
    path: 'dashboard', 
    component: DashboardHome, 
    canActivate: [AuthGuard] 
  },

  { 
    path: 'readings', 
    component: ListReading, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'readings/add', 
    component: AddReading, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'readings/edit/:id', 
    component: EditReading, 
    canActivate: [AuthGuard] 
  },

  { 
    path: 'alerts', 
    component: AlertsList, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'reports', 
    component: ReportsHome, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'settings', 
    component: Settings, 
    canActivate: [AuthGuard] 
  }
];