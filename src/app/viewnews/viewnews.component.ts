import { Component ,OnInit} from '@angular/core';
import { News } from '../_models/news.model';
import { NewsService } from '../_services/news.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-viewsnews',
  templateUrl: './viewnews.component.html',
  styleUrls: ['./viewnews.component.css']
})
export class ViewNewsComponent implements OnInit {
  items: any[] = [];
  previtems: any[] = [];
  pageOfItems?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = -1;
  loading = false;
  searchText="";

  constructor(private newsService: NewsService,private http: HttpClient) {}

  ngOnInit() {
        this.getAll();
}

getAll(){
  // fetch items from the backend api
  this.loading = true;

  this.newsService.GetAll()
      .subscribe({
        next: (data:any) => {
          this.items = data;
          this.previtems = this.items;
          this.loading = false;
        },
        error: (httpError: HttpErrorResponse) => {
            debugger;
            const errorValue: any | null = httpError.error;
            const errorCode: number = httpError.status;
            console.error(`Endpoint returned error ${errorValue} with status code ${errorCode}`)
        }
      });
}

onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

sortBy(property: string) {
  this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
  this.sortProperty = property;
  this.items = [...this.items.sort((a: any, b: any) => {
      // sort comparison function
      let result = 0;
      if (a[property] < b[property]) {
          result = -1;
      }
      if (a[property] > b[property]) {
          result = 1;
      }
      return result * this.sortOrder;
  })];
}

sortIcon(property: string) {
  if (property === this.sortProperty) {
      return this.sortOrder === 1 ? '☝️' : '👇';
  }
  else{
    return '';
  }
}

searchData(event: any) {
  var searchValue = event.target.value;
  this.items = this.previtems.filter((item: News) => {
    return item.title?.toLowerCase().includes(searchValue.toLowerCase());
  });
  this.onChangePage(this.items);
}
  
}