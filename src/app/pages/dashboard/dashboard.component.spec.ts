import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DasboardComponent } from './dashboard.component';
import { ProductService } from 'src/app/services/product.service';
import { of } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

describe('DasboardComponent', () => {

    let component: DasboardComponent;

    let fixture: ComponentFixture<DasboardComponent>;

    let productService: ProductService;

    class MockedProductService {
        /** getAllProducts */
        public getAllProducts = () => of([{}]);

        /** getAllCategories  */
        public getAllCategories  = () => of([{}]);
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, ToastrModule.forRoot(), TranslateModule.forRoot()],
            declarations: [
                DasboardComponent,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [
                ToastrService,
                { provide: ProductService, useClass: MockedProductService },
            ],
        });
        TestBed.compileComponents();
    });

    beforeEach(async(() => {
        fixture = TestBed.createComponent(DasboardComponent);
        component = fixture.debugElement.componentInstance;
        productService = TestBed.inject(ProductService);
    }));

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('check ngOnInit function works fine', () => {

        spyOn(component, 'getAllProducts');

        component.ngOnInit();

        expect(component.getAllProducts).toHaveBeenCalled();
    });

    it('check getAllProducts function works fine', () => {

        spyOn(productService, 'getAllProducts').and.callThrough();

        component.getAllProducts();

        expect(productService.getAllProducts).toHaveBeenCalled();
        expect(component?.products?.length).toEqual(1);
    });

    it('check getFilteredProducts function works fine', () => {

        const data = [{
            category: "men's clothing",
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            id: 1,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            price: 109.95,
            rating: {rate: 3.9, count: 120},
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        }]

        component.getFilteredProducts(data);

        expect(component?.products?.length).toEqual(1);
    });

});
