import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registradores: any[] = [{
    id: 0,
    reg: '$zero',
    status: ''
  }]
  instrucoesCriadas: any[] = []

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
  }
}
