import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private heroService:HeroService,
    private location:Location
    ) { }

  ngOnInit() {
    this.getHero()
  }

  hero:Hero

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero)
  }

  goBack(): void {
    this.location.back()
  }

}
