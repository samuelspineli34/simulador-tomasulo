import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registradores: string[] = ['$zero']
  instrucoesCriadas: any[] = []

  constructor() { }

  ngOnInit(): void {
    for(let i = 0; i < 32; i++) {
      this.registradores.push(`$s${i}`)
    }
  }

  pegarInstrucoes(event: any) {
    this.instrucoesCriadas = event
  }
}
