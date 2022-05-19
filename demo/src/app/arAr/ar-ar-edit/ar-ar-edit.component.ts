import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArArService } from '../ar-ar.service';
import { ArAr } from '../ar-ar';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-ar-ar-edit',
  templateUrl: './ar-ar-edit.component.html',
  styles: [
    // todo: figure out how to make width dynamic
    'form { display: flex; flex-direction: column; min-width: 500px; }',
    'form > * { width: 100% }'
  ]
})
export class ArArEditComponent implements OnInit {

  id!: string;
  arAr!: ArAr;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private arArService: ArArService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p['id']),
        switchMap(id => {
          if (id === 'new') { return of(new ArAr()); }
          return this.arArService.findById(id);
        })
      )
      .subscribe({
        next: arAr => {
          this.arAr = arAr;
          this.feedback = {};
        },
        error: err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      });
  }

  save() {
    this.arArService.save(this.arAr).subscribe({
      next: arAr => {
        this.arAr = arAr;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(async () => {
          await this.router.navigate(['/arArs']);
        }, 1000);
      },
      error: err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    });
  }

  async cancel() {
    await this.router.navigate(['/arArs']);
  }
}
