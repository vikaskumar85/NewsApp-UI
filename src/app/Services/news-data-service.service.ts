import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NewsDataServiceService {

  private BaseUrl : string = "http://localhost:5112/api/News/";

  constructor(private _http:HttpClient) { }

GetAllNews(pageNumber:number,pageSize : number):Observable<any>{
  return this._http.get<any>(this.BaseUrl + "GetAll?Page="+ pageNumber + "&PageSize=" + pageSize );
}

SearchNews(searchValue : any):Observable<any>{
  return this._http.get<any>(this.BaseUrl + "Search/" + searchValue  );
}

}
