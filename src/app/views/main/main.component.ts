import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";


@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})


export class MainComponent implements OnInit, OnDestroy {
  private observable: Observable<void>;
  constructor(
  ) {
    this.observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next();
      }, 10000)
    });

  }

  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.observable.subscribe(this.showPopup);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  closePopup() {
    (document.getElementById('popup') as HTMLElement).style.display = 'none';
  }
  showPopup() {
    (document.getElementById('popup') as HTMLElement).style.display = 'block';
  }

}
