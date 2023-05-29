import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-upload-arquivo',
  templateUrl: './upload-arquivo.component.html',
  styleUrls: ['./upload-arquivo.component.css']
})
export class UploadArquivoComponent implements OnInit {
  @Output() instrucoesCriadas = new EventEmitter<any>();

  opcaoRegistradores: string[] = ['$zero']

  tiposInstrucoes: string[] = ['ADD', 'SUB', 'MULT', 'DIV', 'LW', 'SW', 'BEQ', 'BNE']
  instrucaoSelecionada: string = ''
  registrador1Selecionadol: any
  registrador2Selecionadol: any
  registrador3Selecionadol: any

  intrucaoMIPS: any[] = []
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  colunasTabela: string[] = ['id', 'instrucao', 'registrador1', 'registrador2', 'registrador3']

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
      this.intrucaoMIPS.push({
        id: this.intrucaoMIPS.length === 0 ? 1 : this.intrucaoMIPS[this.intrucaoMIPS.length - 1].id + 1,
        tipoInstrucao: this.instrucaoSelecionada,
        registrador1: this.registrador1Selecionadol,
        registrador2: this.registrador2Selecionadol,
        registrador3: this.registrador3Selecionadol
      })
      this.dataSource = new MatTableDataSource(this.intrucaoMIPS)
      this.instrucoesCriadas.emit(this.intrucaoMIPS)
    }
  }
}
