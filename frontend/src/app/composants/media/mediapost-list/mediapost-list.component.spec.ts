import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediapostListComponent } from './mediapost-list.component';

describe('MediapostListComponent', () => {
  let component: MediapostListComponent;
  let fixture: ComponentFixture<MediapostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediapostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediapostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
