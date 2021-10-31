import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediacommentComponent } from './mediacomment.component';

describe('MediacommentComponent', () => {
  let component: MediacommentComponent;
  let fixture: ComponentFixture<MediacommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediacommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediacommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
