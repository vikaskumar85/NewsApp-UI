import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NewsService } from './news.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


describe('News-Service', () => {
    let service: NewsService;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [NewsService,
          provideHttpClient(), // Provide the HttpClient along with HttpClientTesting
          provideHttpClientTesting()
        ], 
      });
  
      service = TestBed.inject(NewsService);
    
    });

    it('should get all news with correct parameters', () => {
        const mockAPIResponse = [
            {"id":41244468, "title":"The Syndicated Actor Model", "url":"https://syndicate-lang.org/about/"},
            {"id":41243992, "title":"Examples of Great URL Design (2023)", "url":"https://blog.jim-nielsen.com/2023/examples-of-great-urls/"}
          ];
      
        spyOn(service,"GetAll").and.callFake(() => {
            return of(mockAPIResponse);
          });

        service.GetAll().subscribe((result) => {
          expect(result).toEqual(mockAPIResponse); 
        });
    });
  
});  
