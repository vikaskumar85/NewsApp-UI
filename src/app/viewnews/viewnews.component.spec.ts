import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsService } from '../_services/news.service';
import { ViewNewsComponent } from './viewnews.component';
import { PaginationComponent } from '../_components/pagination/pagination.component'
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('ViewsnewsComponent', () => {
  let fixture :any;
  let app : any;
  let service : any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewNewsComponent, PaginationComponent],
      providers:[
        NewsService,
        provideHttpClient(), // Provide the HttpClient along with HttpClientTesting
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNewsComponent);
    app = fixture.componentInstance;
    service = fixture.debugElement.injector.get(NewsService);
  });

  it('should create', () => {
    expect(ViewNewsComponent).toBeTruthy();
  });

  it('should call GetAll on initialization', () => {
    const getNewsSpy = spyOn(app, 'getAll').and.callFake(() => {
      return of({});
    });
    app.ngOnInit();
    expect(getNewsSpy);
  });

  it('should return  List of News',()=>{
  
    const mockAPIResponse = [
      {"id":41244468, "title":"The Syndicated Actor Model", "url":"https://syndicate-lang.org/about/"},
      {"id":41243992, "title":"Examples of Great URL Design (2023)", "url":"https://blog.jim-nielsen.com/2023/examples-of-great-urls/"}
      ];
    spyOn(service,"GetAll").and.callFake(() => {
      return of(mockAPIResponse);
    });

    app.getAll();
    expect(app.items.length).toEqual(2);
  });

  it('should handle getAll error', () => {
    const mockError = new HttpErrorResponse({ error: 'Error', status: 500 });

    spyOn(service,"GetAll").and.callFake(() => {
      return of(mockError);
    });
    spyOn(console, 'error');

    app.getAll();

    fixture.whenStable().then(() => {
      expect(console.error);
    });
  });

  it('should return news data if search value found',()=>{
    let searchValue = "Great URL Design";
    const event = { target: { value: searchValue }};
    const mockAPIResponse = [
      {"id":41244468, "title":"The Syndicated Actor Model", "url":"https://syndicate-lang.org/about/"},
      {"id":41243992, "title":"Examples of Great URL Design (2023)", "url":"https://blog.jim-nielsen.com/2023/examples-of-great-urls/"}
      ];
    spyOn(service,"GetAll").and.callFake(() => {
      return of(mockAPIResponse);
    });

    app.getAll();
    app.searchData(event);
    expect(app.items.length).toEqual(1);
  });

  it('should sort items correctly by property', () => {
    const mockItems = [
      { id: 2, title: 'B' },
      { id: 1, title: 'A' }
    ];
    
    app.items = mockItems;
    
    expect(app.items[0].id).toBe(2);
    expect(app.items[1].id).toBe(1);
    
    // Toggle sort order
    app.sortBy('id');
    
    expect(app.items[0].id).toBe(1);
  });

  it('should return sort icon',()=>{
    var icon = app.sortIcon('id');
    expect(icon).toEqual('👇');
  });

  it('should return sort icon empty',()=>{
    var icon = app.sortIcon('title');
    expect(icon).toEqual('');
  });

  it('should change page of items correctly', () => {
    const mockPageItems = [{ id: 1, title: 'Page Item 1' }];
    
    app.onChangePage(mockPageItems);
    
    expect(app.pageOfItems).toEqual(mockPageItems);
  });
});
