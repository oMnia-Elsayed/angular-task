import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DasboardComponent } from './dashboard.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SearchComponent } from 'src/app/components/search/search.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ProductsTableComponent } from 'src/app/components/products-table/products-table.component';
import { InfoComponent } from 'src/app/components/info/info.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [DasboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ProductCardComponent,
    MatGridListModule,
    SearchComponent,
    NavbarComponent,
    ProductsTableComponent,
    InfoComponent,
    NgxSkeletonLoaderModule.forRoot(),
  ]
})
export class DashboardModule { }
