import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Md5 } from 'ts-md5/dist/md5';
import { LoadingController } from 'ionic-angular';

const keyMARVEL = 'ebd407c102ea3f1262b8dd370cfa04d4a132a867d8b23f3429d72898aaffd1a321761b4a';
const keyDC     = 'a796494a83d4ed8a5a6f8bbb44191904200068de';

@Injectable()
export class HeroService {
    data: any;

    constructor(public http: HttpClient, public loader: LoadingController) { }

    public getAllHeroesMarvel(offset) {

        let timestamp = Number(new Date());
        let hash      = Md5.hashStr(timestamp+keyMARVEL);
        let loader    = this.loader.create({content: "Carregando heróis MARVEL, aguarde..."});
            
        loader.present();
        return new Promise((resolve, reject) => {
            this.http.get(`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&orderBy=name&offset=${offset}&limit=100&apikey=${keyMARVEL}&hash=${hash}`)
            .subscribe(data => {
                loader.dismissAll();

                this.data = data;

                resolve(data);
            }, (err) => {
                loader.dismissAll();
                reject(err)
            }); 
        });
    }

    public getDescriptionHeroMarvel(id: number) {
        return new Promise(resolve => {

            let timestamp = Number(new Date());
            let hash = Md5.hashStr(timestamp+keyMARVEL);
    
            this.http.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${timestamp}&orderBy=name&apikey=${keyMARVEL}&hash=${hash}`)
            .subscribe(data => {
                resolve(data);
            });
        });
    }

    public getDescriptionHeroDC(id: number) {
        return new Promise(resolve => {

           
        });
    }

    public getAllHeroesDC(offset) {
        let loader    = this.loader.create({content: "Carregando heróis DC, aguarde..."});
            
        loader.present();
        return new Promise((resolve, reject) => {
            this.http.get(`https://comicvine.gamespot.com/api/characters/?api_key=${keyDC}&publishers[0]=4010-10&format=json&limit=100&offset=${offset}`)
            .subscribe(data => {
                loader.dismissAll();

                this.data = data;

                resolve(data);
            }, (err) => {
                loader.dismissAll();
                reject(err)
            }); 
        });
    }
}