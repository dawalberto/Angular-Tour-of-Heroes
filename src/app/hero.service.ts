import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

import { Hero } from './hero'
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  constructor(
    private http:HttpClient,
    private messageService:MessageService
  ) { }

  private heroesUrl = 'api/heroes'

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }

  getHero(id:number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id = ${id}`)),
        catchError(this.handleError<Hero>(`getHero id = ${id}`))
      )
  }

  private log(message:string): void {
    this.messageService.add(`HeroService: ${message}`)
  }

  private handleError<T> (operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      console.log(error)
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }

}
