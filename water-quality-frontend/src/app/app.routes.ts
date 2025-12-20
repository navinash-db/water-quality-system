import { Routes } from '@angular/router';

import { AlertsList } from './modules/alerts/alerts-list/alerts-list';
import { Login } from './modules/auth/login/login';
import { DashboardHome } from './modules/dashboard/dashboard-home/dashboard-home';
import { AddReading } from './modules/readings/add-reading/add-reading';
import { EditReading } from './modules/readings/edit-reading/edit-reading';
import { ListReading } from './modules/readings/list-reading/list-reading';
import { ReportsHome } from './modules/reports/reports-home/reports-home';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  { path: 'dashboard', component: DashboardHome },

  { path: 'readings', component: ListReading },
  { path: 'readings/add', component: AddReading },
  { path: 'readings/edit/:id', component: EditReading },

  { path: 'alerts', component: AlertsList },
  { path: 'reports', component: ReportsHome }
];
