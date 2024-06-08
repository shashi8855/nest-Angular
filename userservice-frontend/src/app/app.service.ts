import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './app.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    alert(error.message)
    return throwError(error)
  }

  pdfError(error: HttpErrorResponse) {
    if (error.status === 404) {
      alert('Please generate the PDF before downloading/Viewing.')
    } else {
      alert(error.message)
    }
    return throwError(error)
  }

  createUser(body: User) {
    delete body.id
    return this.http.post<User>(`${this.apiUrl}users`, body).pipe(
      catchError(this.handleError))
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}users`).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(userId: number, body: User) {
    delete body.id
    return this.http.patch(`${this.apiUrl}users/${userId}`, body).pipe(catchError(this.handleError))
  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.apiUrl}users/${userId}`).pipe(catchError(this.handleError))
  }

  generatepdf(body: any) {
    return this.http.post(`${this.apiUrl}generatepdf`, body).pipe(catchError(this.handleError))
  }

  getPdf() {
    return this.http.get(`${this.apiUrl}generatepdf`, {
      responseType: 'blob'
    }).pipe(
      catchError(this.pdfError)
    );
  }

  downloadpdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}generatepdf/download`, {
      responseType: 'blob'
    }).pipe(
      catchError(this.pdfError)
    );
  }
}
