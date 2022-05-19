import { Routes } from '@angular/router';
import { ArArListComponent } from './ar-ar-list/ar-ar-list.component';
import { ArArEditComponent } from './ar-ar-edit/ar-ar-edit.component';

export const ARAR_ROUTES: Routes = [
  {
    path: 'arArs',
    component: ArArListComponent
  },
  {
    path: 'arArs/:id',
    component: ArArEditComponent
  }
];
