import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingTable } from './reading-table';

describe('ReadingTable', () => {
  let component: ReadingTable;
  let fixture: ComponentFixture<ReadingTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
