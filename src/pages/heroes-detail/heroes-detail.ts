import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HeroService } from '../../providers/hero-service/hero-service';

@IonicPage()
@Component({
    selector: 'page-heroes-detail',
    templateUrl: 'heroes-detail.html',
})

export class HeroesDetailPage {
    public obj: any;
    public name: string;
    public thumb: string;
    public description: string;
    public comics: any  = [];
    public series: any  = [];
    public stories: any = [];
  
    constructor(public navCtrl: NavController, public navParams: NavParams, public heroService: HeroService) {
        this.heroService.getDescriptionHeroMarvel(navParams.get("id")).then(data => {
            this.obj = data;

            this.name        = this.obj.data.results[0].name; 
            this.thumb       = this.obj.data.results[0].thumbnail.path +"."+ this.obj.data.results[0].thumbnail.extension;
            this.description =  this.obj.data.results[0].description;
            
            this.comics  = this.obj.data.results[0].comics.items;
            this.series  = this.obj.data.results[0].series.items;
            this.stories = this.obj.data.results[0].stories.items;
        });
    }

    ionViewDidLoad() {}
}