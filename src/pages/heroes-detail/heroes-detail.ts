import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HeroService } from '../../providers/hero-service/hero-service';

@Component({
    selector: 'page-heroes-detail',
    templateUrl: 'heroes-detail.html',
})

export class HeroesDetailPage {
    public id;
    public obj: any;
    public name: string;
    public thumb: string;
    public description: string;
  
    constructor(public navCtrl: NavController, public navParams: NavParams, public heroService: HeroService) {
        this.id = navParams.get("id");
    
        this.heroService.getDescription(this.id).then(data => {
            this.obj = data;

            this.name        = this.obj.data.results[0].name; 
            this.thumb       = this.obj.data.results[0].thumbnail.path +"."+ this.obj.data.results[0].thumbnail.extension;
            this.description =  this.obj.data.results[0].description;
        });
    }

    ionViewDidLoad() {}
}