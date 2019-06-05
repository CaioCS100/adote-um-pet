import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TelaInicialPage } from './tela-inicial.page';
import { FCM } from '@ionic-native/fcm/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';

const routes: Routes = [
  {
    path: 'tela-inicial',
    component: TelaInicialPage,
    children: [
      { path: '', redirectTo: '/tela-inicial/home', pathMatch: 'full' },
      { path: 'home', loadChildren: './home/home.module#HomePageModule' },
      { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TelaInicialPage],
  providers: [FCM, AdMobFree]
})
export class TelaInicialPageModule {}
