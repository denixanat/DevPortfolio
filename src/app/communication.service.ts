// communication.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private searchTermSubject = new Subject<string>();

  // Observable to subscribe to for receiving search terms
  searchTerm$ = this.searchTermSubject.asObservable();

  // Method to send search term from NavbarComponent to ExplorarComponent
  sendSearchTerm(searchTerm: string) {
    console.log('Service: Search term received in service:', searchTerm);
    this.searchTermSubject.next(searchTerm);
  }
}
