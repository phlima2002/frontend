import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciaRapidaComponent } from './denuncia-rapida.component';

describe('DenunciaRapidaComponent', () => {
  let component: DenunciaRapidaComponent;
  let fixture: ComponentFixture<DenunciaRapidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenunciaRapidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenunciaRapidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
