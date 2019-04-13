import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TelaInicialPage } from './tela-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: TelaInicialPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TelaInicialPage]
})
export class TelaInicialPageModule {}
