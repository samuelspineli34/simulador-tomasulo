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
    status: 1,
    instrucao: 'null'
  }]

  /*
    status = null -> sem status
    status = 1 -> ocupado + tooltip com a instrução ocupante
  */

  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  colunasTabela: string[] = ['instrucao', 'registrador1', 'registrador2', 'registrador3']

  instrucoesCriadas: any[] = []
  dataSourceInstrucoes: MatTableDataSource<any> = new MatTableDataSource()
  colunasTabelaInstrucoes: string[] = ['instrucao', 'registrador1', 'registrador2', 'registrador3']

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

  }

  executarTudo() {

  }

  resetarSimulador() {
    this.registradores.forEach(reg => {reg.status = null; reg.instrucao = null})

    this.instrucoesCriadas.forEach (ins => ins.executado = false)
    this.dataSourceInstrucoes = new MatTableDataSource(this.instrucoesCriadas)
    this.dataSourceInstrucoes.paginator = this.paginator
  }
}
