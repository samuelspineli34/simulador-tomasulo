import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  registradores: any[] = [{
    id: 0,
    reg: '$zero',
    status: null,
    instrucao: null
  }]

  /*
    status = null -> sem status
    status = 1 -> ocupado + tooltip com a instrução ocupante
  */

  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  colunasTabela: string[] = ['instrucao', 'registrador1', 'registrador2', 'registrador3']

  instrucoesCriadas: any[] = []
  dataSourceInstrucoes: MatTableDataSource<any> = new MatTableDataSource()
  colunasTabelaInstrucoes: string[] = ['executado', 'instrucao', 'registrador1', 'registrador2', 'registrador3']

  colunasTabelaReserva: string[] = ['instrucao', 'ocupado', 'op', 'vj', 'vk', 'qj', 'qk', 'a', 'resultado']
  dataSourceReserva: MatTableDataSource<any> = new MatTableDataSource()
  estacaoReserva: any[] = []

  constructor() { }

  ngOnInit(): void {
    for(let i = 0; i < 32; i++) {
      this.registradores.push({
        id: this.registradores.length,
        reg: `$s${i}`,
        status: null,
        instrucao: null
      })
    }

    for(let i = 0; i < 2; i++) {
      this.estacaoReserva.push(
        {
          instrucao: `LOAD${i}`,
          ocupado: false,
          op: null,
          vj: null,
          vk: null,
          qj: null,
          qk: null,
          a: null,
          resultado: null
        }
      )
    }

    for(let i = 0; i < 3; i++) {
      this.estacaoReserva.push(
        {
          instrucao: `ADD${i}`,
          ocupado: false,
          op: null,
          vj: null,
          vk: null,
          qj: null,
          qk: null,
          a: null,
          resultado: null
        }
      )
    }

    for(let i = 0; i < 2; i++) {
      this.estacaoReserva.push(
        {
          instrucao: `MULT${i}`,
          ocupado: false,
          op: null,
          vj: null,
          vk: null,
          qj: null,
          qk: null,
          a: null,
          resultado: null
        }
      )
    }

    for(let i = 0; i < 2; i++) {
      this.estacaoReserva.push(
        {
          instrucao: `STORE${i}`,
          ocupado: false,
          op: null,
          vj: null,
          vk: null,
          qj: null,
          qk: null,
          a: null,
          resultado: null
        }
      )
    }
    this.dataSourceReserva = new MatTableDataSource(this.estacaoReserva)
  }

  pegarInstrucoes(event: any) {
    this.instrucoesCriadas = event
    this.dataSourceInstrucoes = new MatTableDataSource(event)
    this.dataSourceInstrucoes.paginator = this.paginator
  }

  proximoPasso() {
    let instrucao = this.instrucoesCriadas.filter(iC => !iC.executado)[0]
    if(instrucao.tipoInstrucao.includes("SUB") || instrucao.tipoInstrucao.includes("ADD")) {
      this.estacaoReserva[2].op = instrucao.tipoInstrucao
      this.estacaoReserva[2].ocupado = true
      this.estacaoReserva[2].vj = null
      this.estacaoReserva[2].vk = instrucao.registrador3.reg
      this.estacaoReserva[2].qj = null
      this.estacaoReserva[2].qk = null
      this.estacaoReserva[2].a = null
      this.estacaoReserva[2].resultado = null
    } else if(instrucao.tipoInstrucao.includes("MULT") || instrucao.tipoInstrucao.includes("DIV")) {
      this.estacaoReserva[5].op = instrucao.tipoInstrucao
      this.estacaoReserva[5].ocupado = true
      this.estacaoReserva[5].vj = null
      this.estacaoReserva[5].vk = instrucao.registrador3.reg
      this.estacaoReserva[5].qj = null
      this.estacaoReserva[5].qk = null
      this.estacaoReserva[5].a = null
      this.estacaoReserva[5].resultado = null
    } else if(instrucao.tipoInstrucao.includes("LW")) {
      this.estacaoReserva[0].op = instrucao.tipoInstrucao
      this.estacaoReserva[0].ocupado = true
      this.estacaoReserva[0].vj = null
      this.estacaoReserva[0].vk = instrucao.registrador3.reg
      this.estacaoReserva[0].qj = null
      this.estacaoReserva[0].qk = null
      this.estacaoReserva[0].a = null
      this.estacaoReserva[0].resultado = null
    } else if(instrucao.tipoInstrucao.includes("SW")) {
      this.estacaoReserva[7].op = instrucao.tipoInstrucao
      this.estacaoReserva[7].ocupado = true
      this.estacaoReserva[7].vj = null
      this.estacaoReserva[7].vk = instrucao.registrador3.reg
      this.estacaoReserva[7].qj = null
      this.estacaoReserva[7].qk = null
      this.estacaoReserva[7].a = instrucao.registrador3.reg.concat(instrucao.registrador2)
      this.estacaoReserva[7].resultado = null
    } else if(instrucao.tipoInstrucao.includes("BEQ") || instrucao.tipoInstrucao.includes("BNE")) {
      /*???*/
    }
    instrucao.executado = true
  }

  executarTudo() {
    for(let i = 0; i < this.instrucoesCriadas.length; i++) {
      this.proximoPasso()
    }
  }

  resetarSimulador() {
    this.registradores.forEach(reg => {reg.status = null; reg.instrucao = null})

    this.instrucoesCriadas.forEach (ins => ins.executado = false)
    this.dataSourceInstrucoes = new MatTableDataSource(this.instrucoesCriadas)
    this.dataSourceInstrucoes.paginator = this.paginator

    this.estacaoReserva.forEach(er => {
      er.ocupado = false
      er.op = null
      er.vj = null
      er.vk = null
      er.qj = null
      er.qk = null
      er.a = null
      er.resultado = null
    })
    this.dataSourceReserva = new MatTableDataSource(this.estacaoReserva)
  }
}
