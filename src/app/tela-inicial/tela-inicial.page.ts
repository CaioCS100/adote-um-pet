import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { FCM } from '@ionic-native/fcm/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.page.html',
  styleUrls: ['./tela-inicial.page.scss'],
})
export class TelaInicialPage implements OnInit {

  constructor(private router: Router,  private fcm: FCM, private admobFree:AdMobFree,
              private toastController: ToastController) { }

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
    this.admobFree.banner.config({
      id: 'ca-app-pub-3953703854206911/8868972710',
      isTesting:true, //Está em ambiente de teste
      autoShow: true
    });

    this.admobFree.banner.prepare();

    //  this.admobFree.banner.prepare()
    //    .then(() => {
    //         this.toastController.create({
    //           message: 'Sucesso',
    //           duration: 2000
    //         }).then(t => t.present());
    //     }).catch(e => {
    //       this.toastController.create({
    //         message: e,
    //         duration: 2000
    //       }).then(t => t.present())
    //     })
  }

  sair()
  {
    console.log('chegou aqui');
    this.router.navigateByUrl('tela-login');
    //navigator['app'].exitApp();
    //this.platform.exit
  }

}
