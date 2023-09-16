import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { SleekResetComponent } from './sleek-reset.component';

describe('SleekResetComponent', () => {
  let component: SleekResetComponent;
  let fixture: ComponentFixture<SleekResetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SleekResetComponent ],
      imports: [IonicModule.forRoot(),RouterTestingModule],
      providers:[UntypedFormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(SleekResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
