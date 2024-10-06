import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {Router} from "@angular/router";
import {ProductType} from "../../../../types/product.type";

@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    constructor(
        private productService: ProductService,
        private router: Router
    ) {
    }

    products: ProductType[] = [];

    ngOnInit(): void {
        this.productService.getProducts()
            .subscribe({
                    next: (data) => {
                        this.products = data;
                        console.log('next');
                    },
                    error: (error) => {
                        console.log(error);
                        this.router.navigate(['/']);
                    }
                }
            )
    }

}
