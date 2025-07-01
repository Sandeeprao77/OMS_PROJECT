import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewteamleadComponent } from './viewteamlead.component';

describe('ViewteamleadComponent', () => {
  let component: ViewteamleadComponent;
  let fixture: ComponentFixture<ViewteamleadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewteamleadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewteamleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
