import { TestBed } from '@angular/core/testing';

import { NewsListComponent } from './news-list.component';
import { NewsDataServiceService } from '../Services/news-data-service.service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { of, throwError } from 'rxjs';

describe('NewsListComponent', () => {
  let fixture :any;
    let app : any;
    let service : any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatFormFieldModule,MatPaginatorModule,MatButtonModule,MatInputModule,MatProgressSpinnerModule,MatFormField
      ],
      declarations: [NewsListComponent],
      providers:[NewsDataServiceService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsListComponent);
    app = fixture.componentInstance;
    service = fixture.debugElement.injector.get(NewsDataServiceService);
  });

  it('should create', () => {
    expect(NewsListComponent).toBeTruthy();
  });

  it('should call GetNews on initialization', () => {
    const getNewsSpy = spyOn(app, 'GetNews').and.callFake(() => {
      return of({});
    });
    app.ngOnInit();
    expect(getNewsSpy).toHaveBeenCalledWith(app.defaultPageNumber, app.defaultPageSize);
  });

 
  /* it('should call GetNews when paginator changes', () => {
    const getNewsSpy = spyOn(app, 'GetNews').and.callFake(() => {
      return of({});
    });
    app.ngAfterViewInit();
    expect(getNewsSpy).toHaveBeenCalled();
  }); */

  
  it('should return  List of News',()=>{
  
    const pageNumber = 1;
    const pageSize = 1;
    const mockAPIResponse = {
      items: [
        {"id":41167800, "title":"IP.network: Check IP Address", "url":"https://www.ip.network/"},
        {"id":41168033, "title":"Writing a tile server in Python", "url":"https://www.grulic.org.ar/~mdione/glob/posts/writing-a-tile-server-in-python/"}
              ],
      totalCount: 2,
  };
    spyOn(service,"GetAllNews").and.callFake(() => {
      return of(mockAPIResponse);
    });
      app.GetNews(pageNumber,pageSize);
      expect(app.NewsDataSource.length).toEqual(2);
  
  });
  it('should return news data if search value found',()=>{
    let searchValue = "Hetzner";
    const event = { target: { value: searchValue }};
    const expected = {
    items: [
          {"id":41168836, "title":"Hetzner Cloud now also in Singapore", "url":"https://www.hetzner.com/news/new-location-singapore/"}
        ],
        totalNoOfItems: 1,
  };
    
   spyOn(service,"SearchNews").and.callFake(() => {
      return of(expected);
    });
  
       app.applySearch(event);
       expect(app.NewsDataSource.length).toEqual(1);
  });
});
