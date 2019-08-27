import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ContaService }  from '../conta.service';
import {Conta} from '../conta';

@Component({
  selector: 'app-conta-detail',
  templateUrl: './conta-detail.component.html',
  styleUrls: ['./conta-detail.component.css']
})
export class ContaDetailComponent implements OnInit {

  conta: Conta;

  constructor(
    private route: ActivatedRoute,
    private contaService: ContaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    console.log('oi');
    this.getConta();
  }

  getConta(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.contaService
        .getConta(id)
        .subscribe(conta => this.conta = conta);
  }

  save(): void {
     this.contaService.atualiza(this.conta)
       .subscribe(() => this.goBack());
   }

  goBack(): void {
    this.location.back();
  }
}
