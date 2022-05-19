import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ArArEditComponent } from './ar-ar-edit.component';
import { ArArService } from '../ar-ar.service';

describe('ArArEditComponent', () => {
  let component: ArArEditComponent;
  let fixture: ComponentFixture<ArArEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ArArEditComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule, MatFormFieldModule],
      providers: [ArArService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArArEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
