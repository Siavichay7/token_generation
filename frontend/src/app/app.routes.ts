import { Routes } from '@angular/router';
import { TokenDisplayComponent } from './token-display/token-display.component';
import { TokenTableComponent } from './token-table/token-table.component';

export const routes: Routes = [
  { path: '', component: TokenTableComponent },
  { path: 'display', component: TokenDisplayComponent },
  // ... otras rutas si existen ...
];
