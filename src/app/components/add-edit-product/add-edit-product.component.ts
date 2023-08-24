import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor, NgIf } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { MatSelectModule } from '@angular/material/select';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, 
    MatButtonModule, ReactiveFormsModule, NgIf, NgFor, MatSelectModule],
})
export class AddEditProductComponent  implements OnInit {

  /** addEdit */
  public addEditForm: FormGroup;

  /** categories */
  public categories: string[];

  /** isEdit */
  public isEdit: boolean;

  /**
   * constructor
   * @param dialogRef 
   * @param formBuilder 
   * @param productService 
   * @param data
   */
  constructor(public dialogRef: MatDialogRef<AddEditProductComponent>, private formBuilder: FormBuilder, 
    private productService: ProductService, @Inject(MAT_DIALOG_DATA) public data: ProductModel[]) {}

  /**
   * ngOnInit
   */
  public ngOnInit() {
    this.constructLoginForm();
    this.productService.getAllCategories().subscribe(res => {
      this.categories = res;
    });

    if(this.data) {
      this.isEdit = true;
      this.setFormValues();
    }

  }

  /**
   * constructLoginForm
   */
  public constructLoginForm() {

    this.addEditForm = this.formBuilder.group({
      id: [""],
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      category: ["", [Validators.required]],
      image: ["", [Validators.required]],
      price: ["", [Validators.required]],
      rating: [""],
    });

  }

  /**
   * onNoClick
   */
  public onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * submit
   */
  public submit() {
    
    if(this.addEditForm.valid) {

      if(this.isEdit) {
        this.dialogRef.close(this.addEditForm.value);

      } else {

        const product: ProductModel = {
          title: this.addEditForm.value.title,
          description: this.addEditForm.value.description,
          category: this.addEditForm.value.category,
          image: this.addEditForm.value.image,
          price: this.addEditForm.value.price,
          rating: {
            count: 0,
            rate: 0,
          }
        }
        this.dialogRef.close(product);
      }

    }
  }

  /**
   * setFormValues
   */
  public setFormValues() {
    this.addEditForm.patchValue(this.data);
  }

}