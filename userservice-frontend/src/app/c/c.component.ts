import { Component, OnInit } from '@angular/core';
import { AComponent } from '../a/a.component';
import { BComponent } from '../b/b.component';
import { AppService } from '../app.service';
import { User } from '../app.model';
import { DComponent } from '../d/d.component';

@Component({
  selector: 'app-c',
  standalone: true,
  imports: [AComponent, BComponent, DComponent],
  templateUrl: './c.component.html',
  styleUrl: './c.component.css'
})
export class CComponent implements OnInit {
  userData!: []
  updateUserData: any
  pdfData: any
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getAllusers()
  }

  getAllusers() {
    this.appService.getUsers().subscribe((data: any) => {
      this.userData = data
    });
  }

  onCreateUser(userData: User) {
    this.appService.createUser(userData).subscribe((response: any) => {
      const { status, message, error } = response
      if (status === 201 && error === null) {
        this.getAllusers()
        alert(response.message)
      }
      if (status === 400) alert(message)
    })
  }

  onUpdateUser(userData: User) {
    this.appService.updateUser(Number(userData.id), userData).subscribe((response: any) => {
      const { status, message, error } = response
      if (status === 200 && error == null) {
        this.getAllusers()
        alert(message)
      } 
    })
  }

  getUpdateuser(userId: number) {
    this.updateUserData = this.userData.filter((each: any) => each.id === userId)
  }

  onDeleteUser(userId: number) {
    const status = confirm('Are You Sure to Delete user.?')
    if (status) this.appService.deleteUser(userId).subscribe(() => {
      this.getAllusers()
    })
  }

  onGeneratepdf(data: any) {
    this.pdfData = data
  }

}
