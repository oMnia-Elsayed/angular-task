import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductModel } from 'src/app/models/product.model';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from 'src/app/services/product.service';
import { NgIf } from '@angular/common';
import { InfoComponent } from '../info/info.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, NgIf, InfoComponent, MatDialogModule, AddEditProductComponent, TranslateModule],
})
export class ProductsTableComponent  implements OnInit, AfterViewInit {

  /** products */
  @Input({required:true}) products: ProductModel[];

  /** displayedColumns */
  public displayedColumns: string[] = ['id', 'title', 'category', 'rate', 'price', 'icons'];

  /** dataSource */
  public dataSource: MatTableDataSource<ProductModel>;

  /** paginator */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * constructor
   * @param productService 
   * @param dialog 
   * @param toastr
   */
  constructor(private productService: ProductService, public dialog: MatDialog, private toastr: ToastrService) {}

  /**
   * ngOnInit
   */
  public ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.products);
  }

  /**
   * ngAfterViewInit
   */
  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * addProduct
   */
  public addProduct(): void {
    const dialogRef = this.dialog.open(AddEditProductComponent, {});

    dialogRef.afterClosed().subscribe((product) => {

      product && this.productService.addProduct(product).subscribe(() => {

        // for table No. 
        product.id = this.products.length + 1;
        
        this.products.push(product);
        
        this.dataSource.data = this.products;

       this.toastr.success('The product item is added successfully', 'Add Product');

      }, () => {

        this.toastr.error('Something went wrong !!!', 'Add Product');
      });
  
    });
  }

  /**
   * editProduct
   * @param {ProductModel} element
   */
  public editProduct(element: ProductModel): void {
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      data: element
    });

    dialogRef.afterClosed().subscribe((product) => {

      product && this.productService.editProduct(product).subscribe(() => {

        const index = this.products.findIndex(el => el.id === product.id);

        this.products[index] = product;
       
        this.dataSource.data = this.products;

       this.toastr.success('The product item is updated successfully', 'Update Product');

      }, () => {

        this.toastr.error('Something went wrong !!!', 'Update Product');
      });
  
    });
  }

  /**
   * deleteProduct
   * @param {number} id
   */
  public deleteProduct(id: number): void {

    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(el => el.id !== id);
      this.dataSource.data = this.products;
      this.toastr.success('The product item is deleted successfully', 'Delete Product');
    }, () => {

      this.toastr.error('Something went wrong !!!', 'Delete Product');
    });

  }
}

