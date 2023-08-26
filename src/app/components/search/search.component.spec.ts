import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {

    let component: SearchComponent;

    let fixture: ComponentFixture<SearchComponent>;

    let productService: ProductService;

    class MockedProductService {

        /** getSpecificCategory  */
        public getSpecificCategory = () => of({});
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ToastrModule.forRoot()],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [
                ToastrService,
                { provide: ProductService, useClass: MockedProductService },
            ],
        });
        TestBed.compileComponents();
    });

    beforeEach(async(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.debugElement.componentInstance;
        productService = TestBed.inject(ProductService);
    }));

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('check search function', () => {
        spyOn(component.filteredProducts, 'emit');

        component.cloneProducts = [{
            category: "men's clothing",
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            id: 1,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            price: 109.95,
            rating: { rate: 3.9, count: 120 },
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        }];

        component.search({} as Event);

        expect(component.products.length).toEqual(1);
        expect(component.filteredProducts.emit).toHaveBeenCalled();
    });

    it('check filter function', () => {
        spyOn(component.filteredProducts, 'emit');
        spyOn(productService, 'getSpecificCategory').and.callThrough();

        component.cloneProducts = [{
            category: "men's clothing",
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            id: 1,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            price: 109.95,
            rating: { rate: 3.9, count: 120 },
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        },{
            category: "women's clothing",
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            id: 1,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            price: 109.95,
            rating: { rate: 3.9, count: 120 },
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        }];

        component.filter("women's clothing");

        expect(productService.getSpecificCategory).toHaveBeenCalled();
        expect(component.filteredProducts.emit).toHaveBeenCalled();
    });

    it('check reset function', () => {
        spyOn(component.filteredProducts, 'emit');

        component.reset();

        expect(component.filteredProducts.emit).toHaveBeenCalled();
    });

});
