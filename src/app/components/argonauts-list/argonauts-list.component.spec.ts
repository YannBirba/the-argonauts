import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgonautsListComponent } from './argonauts-list.component';

describe('ArgonautsListComponent', () => {
  let component: ArgonautsListComponent;
  let fixture: ComponentFixture<ArgonautsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArgonautsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgonautsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
