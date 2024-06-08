import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppService } from '../app.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-d',
  standalone: true,
  imports: [MatButtonModule, MatProgressSpinnerModule, NgIf],
  templateUrl: './d.component.html',
  styleUrl: './d.component.css'
})

export class DComponent {
  @Input() pdfData: any
  loaders: boolean = false

  constructor(private appService: AppService) {

  }
  ngOnChanges(changes: SimpleChanges) {
    const { pdfData } = changes
    if (pdfData && pdfData.currentValue) {
      alert('Please wait while the PDF is being generated.')
      this.loaders = true;
      this.generatePDF(pdfData.currentValue)
    }
  }

  generatePDF(htmlContent: string) {
    const html = `
    <html>
      <head>
        <link href="https://unpkg.com/@angular/material/prebuilt-themes/indigo-pink.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        th,
        td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #f2f2f2;
        }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
    `
    const body = {
      htmlContent: html
    }
    this.appService.generatepdf(body).subscribe((res: any) => {
      if (res.status === 200) {
        this.loaders = false;
        alert(res.message)
      }
    }
    )
  }

}
