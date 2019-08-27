import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Conta} from './conta';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class ContaService {

  private contasUrl = 'http://localhost:8080/planinha/contas';  // URL to web api

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
      private messageService:MessageService,
      private http: HttpClient
  ) {}

  getContas():Observable<Conta[]>{
    this.log('Pegando contas');
    return this.http.get<Conta[]>(this.contasUrl)
        .pipe(
          tap(_ => this.log('peguei contas')),
          catchError(this.handleError<Conta[]>('getHeroes', []))
        );
  }

  getConta(id: number): Observable<Conta> {
    // TODO: send the message _after_ fetching the hero
  //  this.messageService.add(`ContaService: fetched conta id=${id}`);
    return this.http.get<Conta>(`${this.contasUrl}/${id}`)
    .pipe(
      tap(_ => this.log('peguei contas')),
      catchError(this.handleError<Conta>('getHeroes'))
    );
  }

  atualiza(conta:Conta){
    return this.http.post(
      `${this.contasUrl}/${conta.id}`,
      conta,
      this.httpOptions
    );
  }

  /** POST: add a new hero to the server */
  cria (conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(this.contasUrl,conta, this.httpOptions)
          .pipe(
            tap((c: Conta) => this.log(`conta criada/ id=${c.id}`)),
            catchError(this.handleError<Conta>('cria conta'))
          );
  }

  deleta(conta:Conta | number){
    const id = typeof conta === 'number' ? conta :conta.id;
    return this.http.delete(`${this.contasUrl}/${id}`,this.httpOptions)
      .pipe(
        tap(_ => this.log(`conta removida/ id=${id}`)),
        catchError(this.handleError<Conta>('deleta conta'))
      );

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
