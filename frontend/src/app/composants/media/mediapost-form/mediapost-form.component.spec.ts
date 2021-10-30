import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediapostFormComponent } from './mediapost-form.component';

describe('MediapostFormComponent', () => {
  let component: MediapostFormComponent;
  let fixture: ComponentFixture<MediapostFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediapostFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediapostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
