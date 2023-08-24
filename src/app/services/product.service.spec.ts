import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ProductService', () => {

    let service: ProductService;

    let http: HttpClient;

    class MockedHttp {
        /** post */
        public post = () => of({});

        /** get */
        public get = () => of({});

          /** put */
        public put = () => of({});

        /** delete */
        public delete = () => of({});
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                ProductService,
                { provide: HttpClient, useClass: MockedHttp },

            ],
        });

        service = TestBed.inject(ProductService);
        http = TestBed.inject(HttpClient);

    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('check getAllProducts function', () => {
        spyOn(http, 'get').and.callThrough();
        spyOn(service, 'mapProductsModel');

        service.getAllProducts().subscribe();

        expect(http.get).toHaveBeenCalled();
        expect(service.mapProductsModel).toHaveBeenCalled();
    });

    it('check getAllCategories function', () => {
        spyOn(http, 'get').and.callThrough();

        service.getAllCategories();

        expect(http.get).toHaveBeenCalled();
    });

    it('check getSpecificCategory function', () => {
        spyOn(http, 'get').and.callThrough();
        spyOn(service, 'mapProductsModel');

        service.getSpecificCategory('').subscribe();

        expect(http.get).toHaveBeenCalled();
        expect(service.mapProductsModel).toHaveBeenCalled();
    });

    it('check deleteProduct function', () => {
        spyOn(http, 'delete').and.callThrough();

        service.deleteProduct(1).subscribe();

        expect(http.delete).toHaveBeenCalled();
    });

    it('check addProduct function', () => {
        spyOn(http, 'post').and.callThrough();

        service.addProduct({
            category: "men's clothing",
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            id: 1,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            price: 109.95,
            rating: { rate: 3.9, count: 120 },
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        });

        expect(http.post).toHaveBeenCalled();
    });

    it('check editProduct function', () => {
        spyOn(http, 'put').and.callThrough();

        service.editProduct({
            category: "men's clothing",
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            id: 1,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            price: 109.95,
            rating: { rate: 3.9, count: 120 },
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        }).subscribe();

        expect(http.put).toHaveBeenCalled();
    });


});
