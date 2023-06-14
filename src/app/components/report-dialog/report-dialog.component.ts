import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})
export class ReportDialogComponent implements OnInit {

  safeDataUrl: SafeResourceUrl;

  constructor(
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private sanitizer: DomSanitizer
  ) {}

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }

  ngOnInit(): void { 
    this.safeDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.data);
    this.dialogRef.updateSize('100%', '70%');
  }

}
