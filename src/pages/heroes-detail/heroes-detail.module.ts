import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeroesDetailPage } from './heroes-detail';

@NgModule({
  declarations: [
    HeroesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HeroesDetailPage),
  ],
  exports: [HeroesDetailPage]
})
export class HeroesDetailPageModule {}
