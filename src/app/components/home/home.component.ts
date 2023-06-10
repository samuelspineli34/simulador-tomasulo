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
    if(instrucao.tipoInstrucao.includes("LW")) {
      if(this.estacaoReserva[0].ocupado && this.estacaoReserva[1].ocupado) {
        if (this.estacaoReserva[0].dataAlteracao.getTime() < this.estacaoReserva[1].dataAlteracao.getTime()) {
          this.mudarInfoReserva(0, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
            null, null)
        } else {
          this.mudarInfoReserva(1, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
            null, null)
        }
      } else {
        if(!this.estacaoReserva[0].ocupado) {
          this.mudarInfoReserva(0, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
            null, null)
        } else {
          this.mudarInfoReserva(1, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
            null, null)
        }
      }
    } else if(instrucao.tipoInstrucao.includes("SUB") || instrucao.tipoInstrucao.includes("ADD")) {
      if(this.estacaoReserva[2].ocupado && this.estacaoReserva[3].ocupado && this.estacaoReserva[4].ocupado) {
        let indexMaisVelho = 2
        if(this.estacaoReserva[indexMaisVelho].dataAlteracao.getTime() > this.estacaoReserva[3].dataAlteracao.getTime()) {
          indexMaisVelho = 3
        }
        if(this.estacaoReserva[indexMaisVelho].dataAlteracao.getTime() > this.estacaoReserva[4].dataAlteracao.getTime()) {
          indexMaisVelho = 4
        }

        this.mudarInfoReserva(indexMaisVelho, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
          null, null)
      } else {
        if(!this.estacaoReserva[2].ocupado) {
          this.mudarInfoReserva(2, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
            null, null)
        } else if(!this.estacaoReserva[3].ocupado) {
          this.mudarInfoReserva(3, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
            null, null)
        } else {
          this.mudarInfoReserva(4, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
            null, null)
        }
      }

    } else if(instrucao.tipoInstrucao.includes("MULT") || instrucao.tipoInstrucao.includes("DIV")) {
      if(this.estacaoReserva[5].ocupado && this.estacaoReserva[6].ocupado) {
        if (this.estacaoReserva[5].dataAlteracao.getTime() < this.estacaoReserva[6].dataAlteracao.getTime()) {
          this.mudarInfoReserva(5, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
            null, null)
        } else {
          this.mudarInfoReserva(6, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
            null, null)
        }
      } else {
        if(!this.estacaoReserva[5].ocupado) {
          this.mudarInfoReserva(5, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
            null, null)
        } else {
          this.mudarInfoReserva(6, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
            null, null)
        }
      }
    } else if(instrucao.tipoInstrucao.includes("SW")) {
      if(this.estacaoReserva[7].ocupado && this.estacaoReserva[8].ocupado) {
        if (this.estacaoReserva[7].dataAlteracao.getTime() < this.estacaoReserva[8].dataAlteracao.getTime()) {
          this.mudarInfoReserva(7, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
            instrucao.registrador3.reg.concat(` + ${instrucao.registrador2}`), null)
        } else {
          this.mudarInfoReserva(8, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
            instrucao.registrador3.reg.concat(` + ${instrucao.registrador2}`), null)
        }
      } else {
        if(!this.estacaoReserva[7].ocupado) {
          this.mudarInfoReserva(7, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
            instrucao.registrador3.reg.concat(` + ${instrucao.registrador2}`), null)
        } else {
          this.mudarInfoReserva(8, instrucao.tipoInstrucao, null, instrucao.registrador3.reg, null, null,
            instrucao.registrador3.reg.concat(` + ${instrucao.registrador2}`), null)
        }
      }
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
