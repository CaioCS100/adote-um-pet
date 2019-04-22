import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tela-inicial', pathMatch: 'full' },
  { path: '', loadChildren: './tela-inicial/tela-inicial.module#TelaInicialPageModule' },
  { path: 'tela-login', loadChildren: './tela-login/tela-login.module#TelaLoginPageModule' },
  { path: 'tela-cadastro-login', loadChildren: './tela-cadastro-login/tela-cadastro-login.module#TelaCadastroLoginPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
