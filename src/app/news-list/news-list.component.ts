import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NewsDataServiceService } from '../Services/news-data-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css'
})
export class NewsListComponent implements OnInit, AfterViewInit{
  constructor(private _newsDataServiceService: NewsDataServiceService) { }
  displayedColumns: string[] = ['id', 'title', 'url'];
  dataSource : any;
  NewsDataSource: any;
  @ViewChild(MatPaginator) paginator : MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);;
  totalData: number = 0;
  defaultPageNumber: number = 1;
  defaultPageSize: number  = 5
  isLoading = false;

  ngOnInit(): void {
      this.GetNews(this.defaultPageNumber,this.defaultPageSize);
  }
  ngAfterViewInit() {
    this.paginator.length = this.totalData;
      this.paginator.page
      .pipe(
        tap(()=> this.GetNews(
                this.paginator.pageIndex + 1,
                this.paginator.pageSize
              ))
      ).subscribe();
  }

  GetNews(pageNumber : number,pageSize : number ) {
    this.isLoading = true;
    this._newsDataServiceService.GetAllNews(pageNumber,pageSize).subscribe({
    next: (result:any )=> {
        this.totalData = result.totalNoOfItems;
        this.NewsDataSource = result.items;
        this.dataSource = new MatTableDataSource<any>(this.NewsDataSource);
        this.isLoading = false;
    },
    error: (httpError: HttpErrorResponse) => {
          debugger;
          const errorValue: any | null = httpError.error;
          const errorCode: number = httpError.status;
          console.error(`Endpoint returned error ${errorValue} with status code ${errorCode}`)
        }
  });
  }

  // Searching by title or url
  applySearch($event:any)
  {
     const searchVal = ($event.target.value); 
     this.isLoading = true
     if(searchVal != null && searchVal != "" ){
      this._newsDataServiceService.SearchNews(searchVal).subscribe({
        next: (result:any )=> {
          this.NewsDataSource = result.items;
          this.dataSource = new MatTableDataSource<any>( this.NewsDataSource);
          this.totalData = result.totalNoOfItems;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
      },
      error: (httpError: HttpErrorResponse) => {
          debugger;
          const errorValue: any | null = httpError.error;
          const errorCode: number = httpError.status;
          console.error(`Endpoint returned error ${errorValue} with status code ${errorCode}`)
        }
     });
  }
  else{
    this.GetNews(this.defaultPageNumber,this.defaultPageSize);
    this.paginator.length = this.totalData;
  }
  }
}
