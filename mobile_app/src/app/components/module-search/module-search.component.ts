import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ModuleService } from 'src/api';
import { ModuleSearchDialogData } from "./module-search";
import { Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from "rxjs/operators";

@Component({
  selector: 'dialog-module-search',
  templateUrl: './module-search.component.html',
  styleUrls: ['./module-search.component.css']
})
export class ModuleSearchComponent implements OnInit {
  searchTerms$: Subject<any> = new Subject();
  dataSource: any = [];
  displayedColumns: string[] = ['name', 'button'];
  loading: boolean = false;
  public message: string = '';
  private subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<ModuleSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModuleSearchDialogData,
    private moduleService: ModuleService
  ) {
    this.subscription = this.searchTerms$.pipe(
      tap(console.log),
      filter(inputEvent => inputEvent.target && inputEvent.target.value),
      map(inputEvent => inputEvent.target.value),
      distinctUntilChanged(),
      tap(_ => {
        this.loading = true;
        this.message = '';
      }),
      debounceTime(300),
      switchMap((searchText: string) => {
          return this.moduleService.moduleModuleGetRaw(
            this.data.moduleId,
            [{'column': 'name', 'operator': 'LIKE', 'values': [`%${searchText}%`]}]
          );
        }
      )
    ).subscribe(response => {
      console.log('response', response);
      if (response.meta['total-pages'] > 1) {
        let aboutTotal = response.meta['total-pages'] * response.data.length;
        this.message = `${response.data.length} results shown out of about ${aboutTotal}. Try a more specific search.`;
      }
      this.dataSource = response.data.map((value: any) => ({id: value.id, ...value.attributes}));
      this.loading = false;
    }, _ => this.loading = false);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.data.searchName) {
      this.searchTerms$.next({target: {value: this.data.searchName}});
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  select(id: string, name: string) {
    this.data.selectedId = id;
    this.data.selectedName = name;
    this.dialogRef.close(this.data);
  }
}
