import { Routes } from '@angular/router';

import { AddReadingComponent } from './components/add-reading/add-reading';
import { DashboardComponent } from './components/dashboard/dashboard';
// import { LoginComponent } from './components/login/login'; // Removed
import { ReadingTableComponent } from './components/reading-table/reading-table';

export const routes: Routes = [
  // Removed login route, redirecting base path to dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, 
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-reading', component: AddReadingComponent },
  { path: 'readings', component: ReadingTableComponent }
];