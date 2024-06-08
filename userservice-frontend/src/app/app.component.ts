import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CComponent } from './c/c.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'userservice';
}
