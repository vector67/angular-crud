import { TestBed } from '@angular/core/testing';
import { ArArService } from './ar-ar.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ArArService', () => {
  let service: ArArService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArArService]
    });

    service = TestBed.get(ArArService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
