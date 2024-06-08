import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog';
import { NgIf } from '@angular/common'
import { User } from '../app.model';
import { EComponent } from '../e/e.component';
import { DComponent } from '../d/d.component';
import { FComponent } from '../f/f.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-b',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, NgIf, DComponent, EComponent, FComponent],
  templateUrl: './b.component.html',
  styleUrl: './b.component.css'
})
export class BComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() table: boolean = true;
  @Output() deleteUser = new EventEmitter<number>()
  @Output() updateUser = new EventEmitter<number>()
  @Output() generatePdf = new EventEmitter<any>()

  displayedColumns: string[] = ['UserId', 'name', 'email', 'mobile', 'address', 'action']
  userData: User[] = []
  pdfData: any;

  constructor(private dialog: MatDialog, private appService: AppService) { }
  ngOnInit(): void {
    if (this.data && this.data.length > 0) {
      this.userData = this.data?.sort(this.sortData)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    if (data && Array.isArray(data.currentValue)) {
      this.userData = data.currentValue.sort(this.sortData);
    }
  }

  sortData(a: User, b: User): number {
    const aId = a.id ?? 0;
    const bId = b.id ?? 0;
    return bId - aId;
  }

  onDeleteUser(userId: number) {
    this.deleteUser.emit(userId)
  }

  onUpdateUser(userId: number) {
    this.updateUser.emit(userId)
  }

  onGeneratepdf() {
    const element = document.querySelector('.pdf-document')?.outerHTML.replaceAll('"', "'").replace(/<!--ng-container-->/g, '')
    const str = JSON.stringify(element?.replaceAll(/<!--container-->/g, ''))
    this.pdfData = str
  }

  onViewPDF(): void {
    this.appService.getPdf().subscribe(
      (data: Blob) => {
        const downloadUrl = window.URL.createObjectURL(data);
        this.dialog.open(FComponent, {
          minWidth: '1000px',
          height: '500px',
          data: { downloadUrl }
        });
      }
    );
  }
}
