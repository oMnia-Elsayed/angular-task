import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

describe('LoginComponent', () => {

    let component: LoginComponent;

    let fixture: ComponentFixture<LoginComponent>;

    let userService: UserService;

    let router: Router;

    class MockedRouter {
        /** navigate */
        public navigate = () => {}
    }

    class MockedUserService {
        /** login */
        public login = () => of({});
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, ToastrModule.forRoot(), TranslateModule.forRoot()],
            declarations: [
                LoginComponent,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [
                FormBuilder,
                ToastrService,
                { provide: UserService, useClass: MockedUserService },
                { provide: Router, useClass: MockedRouter },
            ],
        });
        TestBed.compileComponents();
    });

    beforeEach(async(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.debugElement.componentInstance;
        userService = TestBed.inject(UserService);
        router = TestBed.inject(Router);
    }));

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('check call constructLoginForm function after calling ngOnInit', () => {
        spyOn(component, 'constructLoginForm');

        component.ngOnInit();

        expect(component.constructLoginForm).toHaveBeenCalled();
    });

    it('check constructLoginForm function works fine', () => {

        component.constructLoginForm();

        expect(component.loginForm).toBeDefined();
    });

    it('login function works fine', () => {

        spyOn(userService, 'login').and.callThrough();
        spyOn(router, 'navigate');

        component.ngOnInit();
        
        component.loginForm?.controls['username']?.setValue('omnia');
        component.loginForm?.controls['password']?.setValue('omnia');

        component.login();

        expect(userService.login).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalled();

    });

});
