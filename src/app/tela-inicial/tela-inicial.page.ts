import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicos/auth.service';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.page.html',
  styleUrls: ['./tela-inicial.page.scss'],
})
export class TelaInicialPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  teste()
  {
    this.authService.deslogar();
  }

}
