import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaProfileComponent } from './sa-profile.component';

describe('SaProfileComponent', () => {
  let component: SaProfileComponent;
  let fixture: ComponentFixture<SaProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
