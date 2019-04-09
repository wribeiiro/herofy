import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HeroService } from '../../providers/hero-service/hero-service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    public heroes: any;
    public items: any   = [];
    searchHero: string  = null;
    count: number       = 0;
  
    constructor(public navCtrl: NavController, public heroService: HeroService) {
        //this.getAllHeroes();
    }

    async getAllHeroes() {
        /*await this.heroService.load().then(data => {
            this.heroes = data;
            this.doPaginate(); 
        });*/
    }
 
    getHeroes(id:number){
        this.navCtrl.push('HeroesDetailPage', {id: id})
    }

    doPaginate() {
       /* for(let x = 0; x < 10; x++) { 
            this.items.push(this.heroes[this.count]); 
            this.count++;
        }*/
    }
            
    doInfinite(infiniteScroll) {
        setTimeout(() => {
            this.doPaginate()
            infiniteScroll.complete();
        }, 500);
    }
 
    getHeroFilter(ev: any) {
        /*if(ev.target.value == '') {
            this.count = 0;
            this.items = [];
            this.getAllHeroes();
        } else {
            this.items = this.heroes.filter((item) => {
                return item.name.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1;
            }); 
        }  */ 
    } 
}
