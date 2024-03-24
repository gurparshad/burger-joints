import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RecognizeBurgerService } from '../recognizeBurgerService/recognizeBurger.service';
import { environment } from '../../../../environment';

describe('RecognizeBurgerService', () => {
  let service: RecognizeBurgerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecognizeBurgerService],
    });
    service = TestBed.inject(RecognizeBurgerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the URL with burger when recognized', () => {
    const imageUrl = 'https://example.com/burger.jpg';
    const mockResponse = {
      urlWithBurger: 'https://example.com/burger-detected.jpg',
    };

    service.recognizeBurger(imageUrl).subscribe(result => {
      console.log('here here 22');
      expect(result).toEqual(mockResponse.urlWithBurger);
    });

    const request = httpMock.expectOne(environment.recognizeBurgerApiUrl);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ urls: [imageUrl] });

    request.flush(mockResponse);
  });

  it('should handle 404 error gracefully', () => {
    const imageUrl = 'https://example.com/burger.jpg';

    service.recognizeBurger(imageUrl).subscribe(result => {
      expect(result).toEqual('No burger found.');
    });

    const request = httpMock.expectOne(environment.recognizeBurgerApiUrl);
    request.error(new ErrorEvent('Not Found'), {
      status: 404,
      statusText: 'Not Found',
    });
  });

  it('should handle 500 error gracefully', () => {
    const imageUrl = 'https://example.com/burger.jpg';

    service.recognizeBurger(imageUrl).subscribe(result => {
      expect(result).toEqual('Internal Server Error.');
    });

    const request = httpMock.expectOne(environment.recognizeBurgerApiUrl);
    request.error(new ErrorEvent('Internal Server Error'), {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
