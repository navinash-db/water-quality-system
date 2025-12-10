import { Routes } from '@angular/router';

import { AddReadingComponent } from './components/add-reading/add-reading';
import { DashboardComponent } from './components/dashboard/dashboard';
import { LoginComponent } from './components/login/login';
import { ReadingTableComponent } from './components/reading-table/reading-table';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-reading', component: AddReadingComponent },
  { path: 'readings', component: ReadingTableComponent }
];
