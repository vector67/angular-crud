import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ArArListComponent } from './ar-ar-list.component';
import { ArArService } from '../ar-ar.service';

describe('ArArListComponent', () => {
  let component: ArArListComponent;
  let fixture: ComponentFixture<ArArListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ArArListComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule, MatFormFieldModule, MatIconModule, MatInputModule, NoopAnimationsModule],
      providers: [ArArService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArArListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
