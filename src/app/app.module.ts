import { HeroesDetailPage } from './../pages/heroes-detail/heroes-detail';
import { HeroService } from './../providers/hero-service/hero-service';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http'; 

import { HomePageModule } from './../pages/home/home.module';
import { HeroesDetailPageModule } from './../pages/heroes-detail/heroes-detail.module';

import { DCPage } from '../pages/dc/dc';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    DCPage,
    //HomePage,
    //HeroesDetailPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HomePageModule,
    HeroesDetailPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
        name: '__dbheroes',
        driverOrder: ['indexeddb', 'localstorage', 'sqlite']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DCPage,
    HomePage,
    HeroesDetailPage,
    TabsPage
  ],
  providers: [
    StatusBar, 
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HeroService
  ]
})
export class AppModule {}
