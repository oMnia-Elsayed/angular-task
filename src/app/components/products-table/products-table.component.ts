import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductModel } from 'src/app/models/product.model';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from 'src/app/services/product.service';
import { NgIf } from '@angular/common';
import { InfoComponent } from '../info/info.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, NgIf, InfoComponent],
})
export class ProductsTableComponent {

  /** products */
  @Input() products: ProductModel[];

  /** displayedColumns */
  public displayedColumns: string[] = ['id', 'title', 'category', 'rate', 'price', 'icons'];

  /** dataSource */
  public dataSource: MatTableDataSource<ProductModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private productService: ProductService) {}

  /**
   * ngOnInit
   */
  public ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.products);
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * addProduct
   */
  public addProduct() {
    console.log('******************');

  }

  /**
   * editProduct
   */
  public editProduct() {
    console.log('******************');

  }

  /**
   * deleteProduct
   */
  public async deleteProduct(id: number) {

    await this.productService.deleteProduct(id).then(() => {
      this.products = this.products.filter(el => el.id !== id);
      this.dataSource.data = this.products;
    });

  }
}

