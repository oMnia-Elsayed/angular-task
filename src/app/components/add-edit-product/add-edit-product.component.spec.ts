import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductComponent } from './add-edit-product.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { of } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('AddEditProductComponent', () => {
  let component: AddEditProductComponent;

  let fixture: ComponentFixture<AddEditProductComponent>;

  let matDialogRef: MatDialogRef<any>;

  class MockedProductService {

    /** categories */
    public categories = [];

    /** getAllProducts */
    public getAllProducts = () => of([]);

    /** getSpecificCategory  */
    public getSpecificCategory = () => of({});

    /** getAllCategories */
    public getAllCategories = () => of({});
  }

  class MockedMatDialogRef {
    /** close */
    public close = () => {}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, ToastrModule.forRoot()],
      providers: [
        FormBuilder,
        ToastrService,
        { provide: MatDialogRef, useClass: MockedMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: ProductService, useClass: MockedProductService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AddEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    matDialogRef = TestBed.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check call constructLoginForm function after calling ngOnInit', () => {
    spyOn(component, 'constructLoginForm');

    component.data = [{
      id: 1,
      category: "men's clothing",
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      price: 109.95,
      rating: { rate: 3.9, count: 120 },
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    }];

    component.ngOnInit();

    expect(component.constructLoginForm).toHaveBeenCalled();

    expect(component.isEdit).toBeTrue();

  });

  it('check constructLoginForm function works fine', () => {

    component.constructLoginForm();

    expect(component.addEditForm).toBeDefined();
  });

  it('check onNoClick function works fine', () => {

    spyOn(matDialogRef, 'close');

    component.onNoClick();

    expect(matDialogRef.close).toHaveBeenCalled();
  });

  it('check onNoClick function works fine', () => {

    spyOn(matDialogRef, 'close');

    component.ngOnInit();
    component.constructLoginForm();

    component.addEditForm?.controls['id']?.setValue(1);
    component.addEditForm?.controls['title']?.setValue('test');
    component.addEditForm?.controls['description']?.setValue('test');
    component.addEditForm?.controls['category']?.setValue('test');
    component.addEditForm?.controls['image']?.setValue('test');
    component.addEditForm?.controls['price']?.setValue(5);

    component.submit();

    expect(matDialogRef.close).toHaveBeenCalled();
  });
});
