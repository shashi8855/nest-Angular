import { Component, Input, OnChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AppService } from '../app.service';

@Component({
  selector: 'app-e',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './e.component.html',
  styleUrl: './e.component.css'
})
export class EComponent {
  constructor(
    private appService: AppService
  ){}

  onDownloadpdf() {
    this.appService.downloadpdf().subscribe(
      (data: Blob) => {
        const downloadUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'generated_pdf.pdf';
        link.click();
        window.URL.revokeObjectURL(downloadUrl);
      },
      error => {
        console.error('Download error:', error);
      }
    );
  }
}
