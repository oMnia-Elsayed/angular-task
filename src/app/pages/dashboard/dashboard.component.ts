import { Component } from '@angular/core';
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
   */
  constructor(private productService: ProductService) { }

  /**
   * ngOnInit
   */
  public ngOnInit() {
    this.isAdmin = localStorage.getItem("isAdmin") === "true";
    this.getAllProducts();
  }

  /**
   * getAllProducts
   */
  public async getAllProducts() {
    await this.productService.getAllProducts();
    await this.productService.getAllCategories();
    this.products = this.productService.productsModel;
    this.categories = this.productService.categories;
  }

  /**
   * getFilteredProducts
   * @param filteredProducts: ProductModel[]
   */
  public getFilteredProducts(filteredProducts: ProductModel[]) {
    this.products = filteredProducts;
  }

}
