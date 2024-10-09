import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductService} from "../../shared/services/product.service";
import {
  AbstractControl,
  FormBuilder, FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";


@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  formValues: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private fb: FormBuilder) {
   this.createForm();
  }

  private createForm() {
    this.formValues = this.fb.group({
      name: ['', [Validators.required, this.fieldValidator('^[A-zА-яЁё\\s]+$')]],
      last_name: ['', [Validators.required, this.fieldValidator('^[A-zА-яЁё\\s]+$')]],
      phone: ['', [Validators.required, this.fieldValidator('^\\+?[0-9]{11}$')]],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      product: [{value: '', disabled: true}, Validators.required],
      address: ['', [Validators.required, this.fieldValidator('^[A-zА-яЁё0-9-\\/\\s]+$')]],
      comment: ['']
    })
  }

  get name() {
    return this.formValues.get('name');
  }
  get last_name() {
    return this.formValues.get('last_name');
  }
  get phone() {
    return this.formValues.get('phone');
  }
  get country() {
    return this.formValues.get('country');
  }
  get zip() {
    return this.formValues.get('zip');
  }
  get product() {
    return this.formValues.get('product');
  }
  get address() {
    return this.formValues.get('address');
  }
  get comment() {
    return this.formValues.get('comment');
  }


  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.formValues.patchValue({
          product: params['product']
        })
      }
    });
  }

  public createOrder() {
    if(this.name?.valid && this.last_name?.valid && this.phone?.valid && this.address?.valid) {

      this.subscriptionOrder = this.productService.createOrder({
        name: this.name?.value,
        last_name: this.last_name?.value,
        phone: this.phone?.value,
        country: this.country?.value,
        zip: this.zip?.value,
        product: this.product?.value,
        address: this.address?.value,
        comment: this.comment?.value,
      })
        .subscribe(response => {
          if (response.success && !response.message) {
            this.formValues.reset();
            (document.getElementById('form') as HTMLElement).style.display = 'none';
            (document.getElementById('success-order') as HTMLElement).style.display = 'block';
            (document.getElementById('create-order') as HTMLElement).removeAttribute( 'disabled');
          } else {
            (document.getElementById('error-message') as HTMLElement).style.display = 'block';
          }
        })
    }
  }

  fieldValidator(pattern: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const result = new RegExp(pattern).test(control.value);
      return result ? null : {pattern: {value: control.value}}
    }
  }

}
