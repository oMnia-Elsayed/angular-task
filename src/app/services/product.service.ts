import { Injectable } from "@angular/core";
import { ProductModel } from "../models/product.model";

/** ProductService */
@Injectable({
    providedIn: 'root',
})
export class ProductService {
    /** productsModel */
    public productsModel: ProductModel[];

    /** categories */
    public categories: string[];

    constructor() { }

    /**
    * getAllProducts
    */
    public async getAllProducts() {
        await fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => data && this.mapProductsModel(data));
    }


    /**
     * mapProductsModel
     * @param data
     */
    public mapProductsModel(data: any) {
        this.productsModel = [];

        Array.isArray(data) && data.forEach(el => {
            const mappedModel: ProductModel = {
                id: el?.id,
                category: el?.category,
                description: el?.description,
                image: el?.image,
                price: el?.price,
                title: el?.title,
                rating: { ...el?.rating }
            }

            this.productsModel.push(mappedModel);
        });

    }

    /**
    * getAllCategories
    */
    public async getAllCategories() {

        this.categories = [];

        await fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(data => data && this.setCategories(data));
    }

    /**
     * setCategories
     */
    public setCategories(data: any) {
        this.categories = [...data];
    }

    /**
     * getSpecificCategory
     */
    public async getSpecificCategory(category: string) {
        await fetch(`https://fakestoreapi.com/products//category/${category}`)
        .then(res => res.json())
        .then(data => data && this.mapProductsModel(data));
    }

    /**
     * deleteProduct
     * @param id: number
     */
    public async deleteProduct(id: number) {
        fetch(`https://fakestoreapi.com/products/${id}`,{
            method:"DELETE"
        })
        .then(res=>res.json())
        .then(json=>json)
    }
}
