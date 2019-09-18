import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Md5 } from 'ts-md5/dist/md5';
import { LoadingController } from 'ionic-angular';

const key = 'ebd407c102ea3f1262b8dd370cfa04d4a132a867d8b23f3429d72898aaffd1a321761b4a';

@Injectable()
export class HeroService {
    data: any;

    constructor(public http: HttpClient, public loader: LoadingController) { }

    getAllHeroes(offset) {

        let timestamp = Number(new Date());
        let hash      = Md5.hashStr(timestamp+key);
        let loader    = this.loader.create({content: "Carregando heróis, aguarde..."});
            
        loader.present();
        return new Promise((resolve, reject) => {
            this.http.get(`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&orderBy=name&offset=${offset}&limit=100&apikey=d8b23f3429d72898aaffd1a321761b4a&hash=${hash}`)
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

    public getDescription(id: number) {
        return new Promise(resolve => {

            let timestamp = Number(new Date());
            let hash = Md5.hashStr(timestamp+key);
    
            this.http.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${timestamp}&orderBy=name&apikey=d8b23f3429d72898aaffd1a321761b4a&hash=${hash}`).subscribe(data => {
                resolve(data);
            });
        });
    }
}