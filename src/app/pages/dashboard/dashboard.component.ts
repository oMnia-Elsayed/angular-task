import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  /**
   * constructor
   * @param router 
   * @param productService
   */
  constructor(private router: Router, private productService: ProductService) { }

  /**
   * ngOnInit
   */
  public ngOnInit() {
    this.isAdmin = localStorage.getItem("isAdmin") === "true" ;
    this.getAllProducts();
  }

  /**
   * getAllProducts
   */
  public async getAllProducts() {
    await this.productService.getAllProducts();
    this.products = this.productService.productsModel;
  }

  /**
   * logout
   */
  public logout() {
    localStorage.removeItem("isAdmin");
    this.router.navigate(["/login"]);
  }
}
