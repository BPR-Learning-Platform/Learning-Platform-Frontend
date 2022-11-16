import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeStatisticsComponent } from './grade-statistics.component';

describe('GradeStatisticsComponent', () => {
  let component: GradeStatisticsComponent;
  let fixture: ComponentFixture<GradeStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
