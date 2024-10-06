import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import {ProductComponent} from "./product/product.component";
import {ProductsComponent} from "./products/products.component";
import {ProductCardComponent} from "../../shared/components/product-card/product-card.component";
import {SharedModule} from "../../shared/shared.module";
import {OrderRoutingModule} from "../order/order-routing.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ProductsRoutingModule,
  ],
  exports: [
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
