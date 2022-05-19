import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ArArListComponent } from './ar-ar-list/ar-ar-list.component';
import { ArArEditComponent } from './ar-ar-edit/ar-ar-edit.component';
import { ArArService } from './ar-ar.service';
import { ARAR_ROUTES } from './ar-ar.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forChild(ARAR_ROUTES),
  ],
  declarations: [
    ArArListComponent,
    ArArEditComponent
  ],
  providers: [ArArService],
  exports: []
})
export class ArArModule { }
