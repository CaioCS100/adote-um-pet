import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurarPetPage } from './procurar-pet.page';

describe('ProcurarPetPage', () => {
  let component: ProcurarPetPage;
  let fixture: ComponentFixture<ProcurarPetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurarPetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurarPetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
