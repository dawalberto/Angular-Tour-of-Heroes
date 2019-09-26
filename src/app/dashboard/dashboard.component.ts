import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero'
import { HeroService } from '../hero.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  constructor(private heroeService:HeroService) { }

  ngOnInit() {
    this.getHeroes()
  }

  heroes:Hero[] = []

  getHeroes(): void {
    this.heroeService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5))
  }

}
