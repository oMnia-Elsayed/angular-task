import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

import { ProductsTableComponent } from './products-table.component';

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;

  let productService: ProductService;
  
  const product = {
    category: "men's clothing",
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    id: 1,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    price: 109.95,
    rating: { rate: 3.9, count: 120 },
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  };

  class MockedMatDialog {
    /** close */
    public close = () => {}

    /** open */
    public open = () => {}
  }

  class MockedProductService {

    /** addProduct */
    public addProduct = () => new Promise((resolve) =>{});

    /** editProduct  */
    public editProduct = () => new Promise((resolve) =>{});

    /** deleteProduct  */
    public deleteProduct = () => new Promise((resolve) =>{});
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useClass: MockedMatDialog },
        { provide: ProductService, useClass: MockedProductService },

      ]
    });
    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productService = TestBed.inject(ProductService);
    component.products = [product];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check ngOnInit function', () => {

    component.ngOnInit();

    expect(component.dataSource?.filteredData?.length).toEqual(1);
  });

  it('check addProduct function', () => {

    spyOn(component.dialog, 'open').and
    .returnValue({
        afterClosed: () => of({})
    } as MatDialogRef<typeof component>);;

    spyOn(productService, 'addProduct').and.callThrough();

    component.addProduct();

    expect(component.dialog.open).toHaveBeenCalled();
    expect(productService.addProduct).toHaveBeenCalled();
  });

  it('check editProduct function', () => {

    spyOn(component.dialog, 'open').and
    .returnValue({
        afterClosed: () => of({})
    } as MatDialogRef<typeof component>);;

    spyOn(productService, 'editProduct').and.callThrough();

    component.editProduct(product);

    expect(component.dialog.open).toHaveBeenCalled();
    expect(productService.editProduct).toHaveBeenCalled();
  });

  it('check deleteProduct function', () => {

    spyOn(productService, 'deleteProduct').and.callThrough();

    component.deleteProduct(1);

    expect(productService.deleteProduct).toHaveBeenCalled();
  });

});
