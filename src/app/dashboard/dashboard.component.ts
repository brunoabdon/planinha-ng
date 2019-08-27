import { Component, OnInit } from '@angular/core';
import { Conta } from '../conta';
import { ContaService } from '../conta.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  contas: Conta[] = [];

  constructor(private contaService: ContaService) { }

  ngOnInit() {
    this.getContas();
  }

  getContas(): void {
    this.contaService.getContas()
      .subscribe(contas => this.contas = contas.slice(1, 5));
  }
}
