import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewsDataServiceService } from './news-data-service.service';
import { of } from 'rxjs';


describe('News-Data-Service', () => {
    let service: NewsDataServiceService;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [NewsDataServiceService], 
      });
  
      service = TestBed.inject(NewsDataServiceService);
    
    });

      it('should get all news with correct parameters', () => {
        const pageNumber = 1;
        const pageSize = 1;
        
        const mockAPIResponse = {
           items: [
                        {"id":41167800, "title":"IP.network: Check IP Address", "url":"https://www.ip.network/"},
                        {"id":41168033, "title":"Writing a tile server in Python", "url":"https://www.grulic.org.ar/~mdione/glob/posts/writing-a-tile-server-in-python/"}
                    ],
                    totalNoOfItems: 2,
        };
      
        spyOn(service,"GetAllNews").and.callFake(() => {
            return of(mockAPIResponse);
          });

        service.GetAllNews(pageNumber, pageSize).subscribe((result) => {
        expect(result).toEqual(mockAPIResponse); 
            });

      });


      it('should get news if search value found', () => {
        const searchValue = "Hetzner";
        
        const mockAPIResponse = {
            items: [
                        {"id":41168836, "title":"Hetzner Cloud now also in Singapore", "url":"https://www.hetzner.com/news/new-location-singapore/"}
                    ],
                    totalNoOfItems: 1,
        };
        spyOn(service,"SearchNews").and.callFake(() => {
            return of(mockAPIResponse);
          });
        service.SearchNews(searchValue).subscribe((res) => {
          expect(res).toEqual(mockAPIResponse); 
        });
        
      });


});  
