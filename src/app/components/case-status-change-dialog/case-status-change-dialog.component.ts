import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-case-status-change-dialog',
  templateUrl: './case-status-change-dialog.component.html',
  styleUrls: ['./case-status-change-dialog.component.css'],
})
export class CaseStatusChangeDialogComponent {
  statuses: string[] = ['W toku', 'Zakończona'];

  constructor(
    public dialogRef: MatDialogRef<CaseStatusChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentStatus: string }
  ) {}
}
