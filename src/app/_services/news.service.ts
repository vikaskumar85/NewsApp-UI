import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { News } from '../_models/news.model';
@Injectable({ providedIn: 'root' })
export class NewsService {
  
constructor(private http: HttpClient) {}
    
    GetAll(): Observable<News[]> {
      return this.http.get<News[]>(`${environment.apiUrl}GetAll`);
    }
}