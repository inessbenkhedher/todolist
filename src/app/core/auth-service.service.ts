import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

   private currentUser = new BehaviorSubject<string | null>(null);

  login(email: string): Observable<boolean> {
    this.currentUser.next(email);
    return of(true);
  }

  logout() {
    this.currentUser.next(null);
  }

  getUserEmail(): Observable<string | null> {
    return this.currentUser.asObservable();
  }

  getCurrentUser(): string | null {
    return this.currentUser.value;
  }
}
