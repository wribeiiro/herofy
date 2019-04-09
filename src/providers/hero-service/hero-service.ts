import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Md5 } from 'ts-md5/dist/md5';

const key = 'ebd407c102ea3f1262b8dd370cfa04d4a132a867d8b23f3429d72898aaffd1a321761b4a';

@Injectable()
export class HeroService {
    teste: any;

    constructor(public http: HttpClient, private storage: Storage) {
        this.teste = this.load();
    }

    async load() {

        let data      = [];
        let timestamp = Number(new Date());
        let hash      = Md5.hashStr(timestamp+key);
        let offset    = 0;

        return new Promise(resolve => {

            for (var x = 0; x <= 14; x++) {
                offset =  x * 100;

                this.http.get(`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&orderBy=name&offset=${offset}&limit=100&apikey=d8b23f3429d72898aaffd1a321761b4a&hash=${hash}`).subscribe(values => {
                    data.push(values);
                }); 
            }

            resolve(data);
        }); 
    }

    public save(key: string, data) {
        return this.storage.set(key, data);
    }

    public remove(key: string) {
        return this.storage.remove(key);
    } 
 
    public getAll() { 
        return new Promise ((resolve, reject) => {
            return this.storage.get('marvel').then((marvel) => {
                resolve(marvel);
            });    
        });
    }

    public getDescription(id: number) {
        let data = [];

        return new Promise(resolve => {

            let timestamp = Number(new Date());
            let hash = Md5.hashStr(timestamp+key);
    
            this.http.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${timestamp}&orderBy=name&apikey=d8b23f3429d72898aaffd1a321761b4a&hash=${hash}`).subscribe(values => {
                data = data;
                resolve(data);
            });
        });
    }

    /*public getClient(codigo: any) {
        return new Promise ((resolve, reject) => {
            return this.storage.get('clients-'+this.token).then((val) => {
                val.filter(function(client) { 
                    if(client.codigo.indexOf(codigo) > -1) {
                        resolve(client);
                    } 
                });
            });
        });
    }*/
}