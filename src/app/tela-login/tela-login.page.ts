import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../servicos/auth.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.page.html',
  styleUrls: ['./tela-login.page.scss'],
})
export class TelaLoginPage implements OnInit {

  formulario:FormGroup;

  constructor(private formBuilder: FormBuilder, private toastController: ToastController,
              private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      senha: ['',[Validators.required]]
    });
  }

  fazerLogin() {
    this.authService.login(this.formulario.get('email').value,
       this.formulario.get('senha').value).then( resposta =>{
        this.router.navigateByUrl('tela-inicial');
       }).catch(erro => {
        this.mostrarErro();
       });
  }

  fazerCadastro() {
    this.router.navigateByUrl('tela-cadastro-login');
  }

  async mostrarErro() {
    const toast = await this.toastController.create({
      message: 'Login ou senha incorreta!',
      duration: 3000
    });
    toast.present();
  }

}
