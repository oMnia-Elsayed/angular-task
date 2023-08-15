import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DasboardComponent } from './dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [DasboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule, 
    MatButtonModule, 
  ]
})
export class DashboardModule { }
