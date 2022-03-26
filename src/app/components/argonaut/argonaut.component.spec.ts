import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgonautComponent } from './argonaut.component';

describe('ArgonautComponent', () => {
  let component: ArgonautComponent;
  let fixture: ComponentFixture<ArgonautComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArgonautComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgonautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
