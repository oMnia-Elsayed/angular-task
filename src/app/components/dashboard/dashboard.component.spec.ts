import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DasboardComponent } from './dashboard.component';

describe('DasboardComponent', () => {

    let component: DasboardComponent;

    let fixture: ComponentFixture<DasboardComponent>;

    let router: Router;

    class MockedRouter {
        /** navigate */
        public navigate = () => {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                DasboardComponent,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [
                { provide: Router, useClass: MockedRouter },
            ],
        });
        TestBed.compileComponents();
    });

    beforeEach(async(() => {
        fixture = TestBed.createComponent(DasboardComponent);
        component = fixture.debugElement.componentInstance;
        router = TestBed.inject(Router);
    }));

    it('should create component', () => {
        expect(component).toBeTruthy();
    });


    it('check logout function works fine', () => {

        spyOn(router, 'navigate');

        component.logout();

        expect(router.navigate).toHaveBeenCalled();
    });

});
