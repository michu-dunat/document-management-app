import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatTabsModule,
    MatListModule,
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatTabsModule,
    MatListModule,
  ],
})
export class MaterialModule {}
