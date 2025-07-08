import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailImmoComponent } from './detail-immo.component';

describe('DetailImmoComponent', () => {
  let component: DetailImmoComponent;
  let fixture: ComponentFixture<DetailImmoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailImmoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailImmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
