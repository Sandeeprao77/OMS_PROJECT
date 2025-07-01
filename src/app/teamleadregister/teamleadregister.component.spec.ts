import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamleadregisterComponent } from './teamleadregister.component';

describe('TeamleadregisterComponent', () => {
  let component: TeamleadregisterComponent;
  let fixture: ComponentFixture<TeamleadregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamleadregisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamleadregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
