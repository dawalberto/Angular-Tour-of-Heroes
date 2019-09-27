import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})

export class HeroSearchComponent implements OnInit {

  constructor(private heroService:HeroService) { }

  ngOnInit() {
    this.heroes$ = this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term:string) => this.heroService.searchHeroes(term))
      )
  }

  heroes$:Observable<Hero[]>
  private searchTerms = new Subject<string>()

  search(term:string): void {
    this.searchTerms.next(term)
  }

}
