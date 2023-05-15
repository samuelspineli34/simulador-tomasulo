import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-arquivo',
  templateUrl: './upload-arquivo.component.html',
  styleUrls: ['./upload-arquivo.component.css']
})
export class UploadArquivoComponent implements OnInit {

  tiposInstrucoes: string[] = ['ADD', 'SUB', 'MULT', 'DIV', 'LW', 'SW', 'BEQ', 'BNE']
  instrucaoSelecionada: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
