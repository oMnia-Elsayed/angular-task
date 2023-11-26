import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {

    let component: ProductCardComponent;

    let fixture: ComponentFixture<ProductCardComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [],
        });
        TestBed.compileComponents();
    });

    beforeEach(async(() => {
        fixture = TestBed.createComponent(ProductCardComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

});
