import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HeroService } from '../../providers/hero-service/hero-service';
import { HeroesDetailPage } from '../heroes-detail/heroes-detail';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    heroes: any         = [];
    searchHero: string  = null;
    offset: number      = 0;
    constructor(public navCtrl: NavController, public heroService: HeroService){
        
    } 

    ionViewDidLoad(){
        this.getAllHeroes();
    }
 
    async getAllHeroes() {
        await this.heroService.getAllHeroes(this.offset).then((data) => {
            this.heroes = data['data']['results'];
        }).catch((err) => {
            alert("Error in loading data: " + err)
        });
    }
 
    getHeroes(id: number){
        this.navCtrl.push(HeroesDetailPage, {id: id})
    }

    doPaginateHeroes(infiniteScroll) {
        this.offset += 100;
        
        if(this.offset < 1400) {
            setTimeout(() => {
                this.heroService.getAllHeroes(this.offset).then(data => {
                
                    for(let hero of data['data']['results']){
                        this.heroes.push(hero);
                    }

                }).catch((err) => {
                    alert("Error in loading data: " + err);
                });

                infiniteScroll.complete();
            }, 500);
        }
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
