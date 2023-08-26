import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DasboardComponent {

  /** isAdmin */
  public isAdmin: boolean;

  /** prducts */
  public products: ProductModel[];

  /** categories */
  public categories: string[];

  /**
   * constructor
   * @param productService
   * @param toastr
   */
  constructor(private productService: ProductService, private toastr: ToastrService) { }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.isAdmin = localStorage.getItem("userRole") === "admin";
    this.getAllProducts();
    !this.isAdmin && this.getAllCategories();
  }

  /**
   * getAllProducts
   */
  public getAllProducts(): void {
    this.productService.getAllProducts().subscribe(res => {
      this.products = res;
    }, () => {

      this.toastr.error('Something went wrong !!!', 'Get all Products');
    });
  }

  /**
   * getAllCategories
   */
  public getAllCategories(): void {
    this.productService.getAllCategories().subscribe(res => {
      this.categories = res as string[];
    }, () => {

      this.toastr.error('Something went wrong !!!', 'Get all categories');
    });
  }

  /**
   * getFilteredProducts
   * @param {ProductModel[]} filteredProducts
   */
  public getFilteredProducts(filteredProducts: ProductModel[]): void {
    this.products = filteredProducts;
  }

}
