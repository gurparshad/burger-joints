import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  setLoadingState(state: boolean): void {
    this.loadingSubject.next(state);
  }

  getLoadingState(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
}
