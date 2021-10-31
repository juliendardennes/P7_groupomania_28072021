import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediacommentListComponent } from './mediacomment-list.component';

describe('MediacommentListComponent', () => {
  let component: MediacommentListComponent;
  let fixture: ComponentFixture<MediacommentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediacommentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediacommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
