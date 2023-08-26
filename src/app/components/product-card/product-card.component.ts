import { Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule,
    MatIconModule,
  ],
})
export class ProductCardComponent { 
  
  /** productItem */
  @Input({required:true}) public productItem: ProductModel;

}
