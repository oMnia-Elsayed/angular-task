import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HelperService } from './helper.service';

describe('HelperService', () => {

    let service: HelperService;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                HelperService,
            ],
        });

        service = TestBed.inject(HelperService);
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('check prepareUrl function works fine', () => {

       const url = service.prepareUrl('https://fakestoreapi.com/products/{id}', { id: 20});

        expect(url).toBe('https://fakestoreapi.com/products/20');

    });
});
