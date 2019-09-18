import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HeroService } from '../../providers/hero-service/hero-service';

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
            this.offset = data['data']['offset'];

        }).catch((err) => {
            alert("Error in loading data: " + err)
        })
    }
 
    getHeroes(id: number){
        this.navCtrl.push('HeroesDetailPage', {id: id})
    }

    async doPaginateHeroes() {
        for(let i = 1; i <= 14; i++) {
            this.offset = i * 100;

            await this.heroService.getAllHeroes(this.offset).then(data => {
                this.heroes.push(data['data']['results']);
            }).catch((err) => {
                alert("Error in loading data: " + err);
            });
        }
    }
             
    doInfinite(infiniteScroll) {
        setTimeout(() => {
            this.doPaginateHeroes()
            infiniteScroll.complete();
        }, 750);
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
