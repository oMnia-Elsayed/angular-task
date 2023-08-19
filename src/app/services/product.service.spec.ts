import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';

describe('ProductService', () => {

    let service: ProductService;

    let router: Router;

    class MockedRouter {
        /** navigate */
        public navigate = () => {}
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                ProductService,
                { provide: Router, useClass: MockedRouter },
            ],
        });

        service = TestBed.inject(ProductService);
        router = TestBed.inject(Router);
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
