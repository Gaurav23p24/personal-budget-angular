
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/budget';
  private budgetDataSubject = new BehaviorSubject<any[]>([]); // Start with an empty array

  constructor(private http: HttpClient) {}

  // Fetch data from backend only if the budget data is empty
  fetchBudgetData(): void {
    if (this.budgetDataSubject.getValue().length === 0) {
      console.log('Fetching data from backend');
      this.http.get<any>(this.apiUrl).pipe(
        tap((res: any) => {
          // Update budget data observable
          this.budgetDataSubject.next(res.myBudget);
        })
      ).subscribe();
    } else {
      console.log('Data already available, no need to fetch from backend');
    }
  }

  // Getter method to expose budget data
  getBudgetData(): Observable<any[]> {
    return this.budgetDataSubject.asObservable();
  }
}
