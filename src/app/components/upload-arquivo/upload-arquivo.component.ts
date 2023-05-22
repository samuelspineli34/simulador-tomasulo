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

  validarDados() {
    let msg = ''
    if(!this.instrucaoSelecionada) {
      msg += 'Instrução não selecionada'
    }

    if(!this.registrador1Selecionadol) {
      if(msg.length > 0) {
        msg += ', '
      }
      msg += 'registrador 1 não selecionado'
    }

    if(!this.registrador2Selecionadol) {
      if(msg.length > 0) {
        msg += ', '
      }
      msg += 'registrador 2 não selecionado'
    }

    if(!this.registrador3Selecionadol) {
      if(msg.length > 0) {
        msg += ', '
      }
      msg += 'registrador 3 não selecionado'
    }

    return msg.substring(0, 1).toUpperCase() + msg.substring(1)
  }

  criar() {
    if(this.validarDados().length === 0) {

    }
  }
}
