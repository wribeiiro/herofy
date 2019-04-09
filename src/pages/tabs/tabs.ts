import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { DCPage } from '../dc/dc';
import { HeroesDetailPage } from '../heroes-detail/heroes-detail';

@Component({
    templateUrl: 'tabs.html'
})

export class TabsPage {

    tab1Root = HomePage;
    tab2Root = DCPage;

    constructor() {}
}
