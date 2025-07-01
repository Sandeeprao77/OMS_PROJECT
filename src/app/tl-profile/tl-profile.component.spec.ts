import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlProfileComponent } from './tl-profile.component';

describe('TlProfileComponent', () => {
  let component: TlProfileComponent;
  let fixture: ComponentFixture<TlProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TlProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TlProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
