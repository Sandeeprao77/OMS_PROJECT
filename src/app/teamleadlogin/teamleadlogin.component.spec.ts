import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamleadloginComponent } from './teamleadlogin.component';

describe('TeamleadloginComponent', () => {
  let component: TeamleadloginComponent;
  let fixture: ComponentFixture<TeamleadloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamleadloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamleadloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
