import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.page.html',
  styleUrls: ['./tela-inicial.page.scss'],
})
export class TelaInicialPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sair()
  {
    console.log('chegou aqui');
    this.router.navigateByUrl('tela-login');
    //navigator['app'].exitApp();
    //this.platform.exit
  }

}
