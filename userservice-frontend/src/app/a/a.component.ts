import { Component, Output, EventEmitter, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../app.model';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-a',
  standalone: true,
  imports: [MatButtonModule, FormsModule, NgIf],
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css']
})
export class AComponent {
  @Output() createUser = new EventEmitter<User>()
  @Output() updateUser = new EventEmitter()
  @ViewChild('userForm') userForm!: NgForm;
  @Input() updateUserData: any;

  id!: number
  userName!: string
  userEmail!: string
  mobileNumber!: string
  address!: string
  updateUserForm: boolean = false
  title: string = 'Create'
  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    const { updateUserData } = changes
    if (updateUserData && Array.isArray(updateUserData.currentValue)) {
      const [userData] = updateUserData.currentValue
      this.id = userData.id
      this.userName = userData.name
      this.userEmail = userData.email
      this.address = userData.address
      this.mobileNumber = userData.phone_number
      this.title = 'Update'
    }
  }

  postUser() {
    const body: User = {
      name: this.userName,
      email: this.userEmail,
      phone_number: this.mobileNumber,
      address: this.address
    }
    if (this.title === 'Create') this.createUser.emit(body);
    if (this.title === 'Update') this.updateUser.emit({ ...body, id: this.id })
    this.resetFrom()
  }

  resetFrom() {
    this.userForm.reset()
    this.title = 'Create'
  }
}
