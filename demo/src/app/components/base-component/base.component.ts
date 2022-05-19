import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'crm-base-component',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<any> = new Subject<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  takeUntilDestroyed() {
    return <U>(source: Observable<U>) => {
      return source.pipe(takeUntil<U>(this.unsubscribe$));
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
