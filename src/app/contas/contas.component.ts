import { Component, OnInit } from '@angular/core';
import { Conta } from '../conta';
import {ContaService} from '../conta.service';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {

  contas:Conta[];

  constructor(private contaService:ContaService) { }

   getContas():void{
     this.contaService.getContas().subscribe(
        contas => this.contas = contas
     );
   }

   cria(nome:string)  {
     nome = nome.trim();
     if(!nome) return;
     this.contaService.cria({nome} as Conta).subscribe(
       c => this.contas.push(c)
     );
   }

   deleta(conta:Conta){
     this.contas = this.contas.filter(c => c !== conta);
     this.contaService.deleta(conta).subscribe();
   }


  ngOnInit() {
    this.getContas();
  }

}
