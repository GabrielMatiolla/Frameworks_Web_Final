import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conteudo } from './conteudo';

describe('Conteudo', () => {
  let component: Conteudo;
  let fixture: ComponentFixture<Conteudo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conteudo],
    }).compileComponents();

    fixture = TestBed.createComponent(Conteudo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
