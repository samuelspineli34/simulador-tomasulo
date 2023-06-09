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
          resultado: null,
          dataAlteracao: null
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
          resultado: null,
          dataAlteracao: null
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
          resultado: null,
          dataAlteracao: null
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
          resultado: null,
          dataAlteracao: null
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
      this.mudarInfoReserva(2, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
        null, null)
    } else if(instrucao.tipoInstrucao.includes("MULT") || instrucao.tipoInstrucao.includes("DIV")) {
      this.mudarInfoReserva(5, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
        null, null)
    } else if(instrucao.tipoInstrucao.includes("LW")) {
      this.mudarInfoReserva(0, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
        null, null)
    } else if(instrucao.tipoInstrucao.includes("SW")) {
      this.mudarInfoReserva(7, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
        instrucao.registrador3.reg.concat(` + ${instrucao.registrador2}`), null)
    } else if(instrucao.tipoInstrucao.includes("BEQ") || instrucao.tipoInstrucao.includes("BNE")) {
      /*???*/
    }
    instrucao.executado = true
    this.registradores.forEach(re => {
      if(re.id === instrucao.registrador1.id) {
        re.status = 1
        re.instrucao = instrucao.tipoInstrucao // provisório
      }
    })
  }

  mudarInfoReserva(index: number, tipoInstrucao: any, vj: any, vk: any, qj: any, qk: any, a: any, resultado: any) {
    this.estacaoReserva[index].op = tipoInstrucao
    this.estacaoReserva[index].ocupado = true
    this.estacaoReserva[index].vj = vj
    this.estacaoReserva[index].vk = vk
    this.estacaoReserva[index].qj = qj
    this.estacaoReserva[index].qk = qk
    this.estacaoReserva[index].a = a
    this.estacaoReserva[index].resultado = resultado
    this.estacaoReserva[index].dataAlteracao = new Date()
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
