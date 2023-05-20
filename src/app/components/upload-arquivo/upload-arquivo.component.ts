import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-arquivo',
  templateUrl: './upload-arquivo.component.html',
  styleUrls: ['./upload-arquivo.component.css']
})
export class UploadArquivoComponent implements OnInit {

  tipoRegistrador2: boolean = false
  tipoRegistrador3: boolean = false

  opcaoRegistradores: string[] = []

  tiposInstrucoes: string[] = ['ADD', 'SUB', 'MULT', 'DIV', 'LW', 'SW', 'BEQ', 'BNE']
  instrucaoSelecionada: string = ''
  registrador1Selecionadol: any
  registrador2Selecionadol: any
  registrador3Selecionadol: any

  constructor() { }

  ngOnInit(): void {
    for(let i = 0; i < 32; i++) {
      this.opcaoRegistradores.push(`$s${i}`)
    }
  }

}
