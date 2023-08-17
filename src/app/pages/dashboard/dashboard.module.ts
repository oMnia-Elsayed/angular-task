import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DasboardComponent } from './dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [DasboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule, 
    MatButtonModule, 
    ProductCardComponent,
    MatGridListModule,
  ]
})
export class DashboardModule { }
