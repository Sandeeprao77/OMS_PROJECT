import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminregisterComponent } from './superadminregister.component';

describe('SuperadminregisterComponent', () => {
  let component: SuperadminregisterComponent;
  let fixture: ComponentFixture<SuperadminregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperadminregisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperadminregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
