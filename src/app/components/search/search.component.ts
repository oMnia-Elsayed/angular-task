import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/models/product.model';
import { isEmpty, cloneDeep } from 'lodash';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, NgFor]
})
export class SearchComponent implements OnInit {

    /** products */
    @Input() products: ProductModel[];

    /** filteredProducts */
    @Output() filteredProducts = new EventEmitter<any>();

    /** categories */
    @Input() categories: string[];

    /** searchText */
    public searchText = '';

    /** cloneProducts */
    public cloneProducts: ProductModel[];
  
    /**
     * constructor
     * @param productService 
     */
    constructor(private productService: ProductService) {}

    /**
     * ngOnInit
     */
    public ngOnInit() {
        this.cloneProducts = cloneDeep(this.products);
    }

    /**
     * search
     * @param event
     */
    public search(event: any) {
        this.searchText = event.target?.value;
        
        if(!isEmpty(this.searchText)) {
            this.productService.productsModel = this.cloneProducts?.filter(el => el.title?.toLowerCase().includes(this.searchText.toLowerCase()));
        } else {
            this.productService.productsModel = this.cloneProducts;
        }

        this.filteredProducts.emit(this.productService.productsModel);
    }

    /**
     * filter
     */
    public async filter(category: string) {
        await this.productService.getSpecificCategory(category);        
        this.filteredProducts.emit(this.productService.productsModel);
    }

    /**
     * reset
     */
    public reset() {
        this.productService.productsModel = this.cloneProducts;    
        this.filteredProducts.emit(this.productService.productsModel);
    }

}
