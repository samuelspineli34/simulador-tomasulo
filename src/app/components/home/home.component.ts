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
    status: ''
  }]
  instrucoesCriadas: any[] = []
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  colunasTabela: string[] = ['instrucao', 'registrador1', 'registrador2', 'registrador3']

  constructor() { }

  ngOnInit(): void {
    for(let i = 0; i < 32; i++) {
      this.registradores.push({
        id: this.registradores.length,
        reg: `$s${i}`,
        status: ''
      })
    }
  }

  pegarInstrucoes(event: any) {
    this.instrucoesCriadas = event
    this.dataSource = new MatTableDataSource(event)
    this.dataSource.paginator = this.paginator
  }
}
