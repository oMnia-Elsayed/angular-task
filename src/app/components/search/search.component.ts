import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/models/product.model';
import { isEmpty, cloneDeep } from 'lodash';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, NgFor]
})
export class SearchComponent implements OnInit {

    /** products */
    @Input({required:true}) products: ProductModel[];

    /** filteredProducts */
    @Output() filteredProducts = new EventEmitter<ProductModel[]>();

    /** categories */
    @Input({required:true}) categories: string[];

    /** searchText */
    public searchText = '';

    /** cloneProducts */
    public cloneProducts: ProductModel[];
  
    /**
     * constructor
     * @param productService   
     * @param toastr
     */
    constructor(private productService: ProductService, private toastr: ToastrService) {}

    /**
     * ngOnInit
     */
    public ngOnInit(): void {
        this.cloneProducts = cloneDeep(this.products);
    }

    /**
     * search
     * @param event
     */
    public search(event: Event): void {

        const input = event.target as HTMLInputElement;

        this.searchText =  input?.value;
        
        if(!isEmpty(this.searchText)) {
            this.products = this.cloneProducts?.filter(el => el.title?.toLowerCase().includes(this.searchText.toLowerCase()));
        } else {
            this.products = this.cloneProducts;
        }

        this.filteredProducts.emit(this.products);
    }

    /**
     * filter
     * @param {string} category
     */
    public filter(category: string): void {
        this.productService.getSpecificCategory(category).subscribe(res => {
            this.filteredProducts.emit(res);
        }, () => {

            this.toastr.error('Something went wrong !!!', 'Filter by category');
        });        
    }

    /**
     * reset
     */
    public reset(): void {
        this.searchText = '';
        this.filteredProducts.emit(this.cloneProducts);
    }

}
