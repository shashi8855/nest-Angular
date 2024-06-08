import { Component, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-f',
  standalone: true,
  imports: [],
  templateUrl: './f.component.html',
  styleUrl: './f.component.css'
})
export class FComponent {
  pdfUrl: SafeResourceUrl | null = null;
  constructor(
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.downloadUrl);
  }
}
