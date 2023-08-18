import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DasboardComponent } from './dashboard.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SearchComponent } from 'src/app/components/search/search.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@NgModule({
  declarations: [DasboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ProductCardComponent,
    MatGridListModule,
    SearchComponent,
    NavbarComponent,
  ]
})
export class DashboardModule { }
