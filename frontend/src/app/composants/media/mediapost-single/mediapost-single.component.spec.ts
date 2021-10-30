import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediapostSingleComponent } from './mediapost-single.component';

describe('MediapostSingleComponent', () => {
  let component: MediapostSingleComponent;
  let fixture: ComponentFixture<MediapostSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediapostSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediapostSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
