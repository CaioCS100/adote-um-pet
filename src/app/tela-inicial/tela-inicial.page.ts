import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.page.html',
  styleUrls: ['./tela-inicial.page.scss'],
})
export class TelaInicialPage implements OnInit {

  constructor(private router: Router,  private fcm: FCM) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      //Salva o token unico do usuário
      this.fcm.getToken().then(token => {
      let userID = user.uid;
      firebase.database().ref("usuario").child(userID).child('token').set(token);
      //Inscreve o usuário em um tópico de aula
      this.fcm.subscribeToTopic("dono");
      });
    });
  }

  sair()
  {
    console.log('chegou aqui');
    this.router.navigateByUrl('tela-login');
    //navigator['app'].exitApp();
    //this.platform.exit
  }

}
