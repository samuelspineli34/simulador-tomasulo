import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadArquivoComponent } from './upload-arquivo.component';

describe('UploadArquivoComponent', () => {
  let component: UploadArquivoComponent;
  let fixture: ComponentFixture<UploadArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadArquivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
