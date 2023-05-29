import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  instrucoesCriadas: any[] = []
  enviarInfo: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  pegarInstrucoes(event: any) {
    this.instrucoesCriadas = event
  }

  passarInfor(event: any) {
    console.log(this.instrucoesCriadas)
    if(event === 1) {
      this.enviarInfo = true
    } else {
      this.enviarInfo = false
    }
  }
}
