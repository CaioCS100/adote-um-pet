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
    if(this.formulario.valid)
    {
      this.authService.verificarLogin(this.formulario).then( resposta =>{
        this.router.navigateByUrl('tela-inicial');
       }).catch(erro => {
        this.mostrarErro('Login ou senha incorreta!');
       });
    }
    else
      this.verificarCamposComErro();
  }

  private verificarCamposComErro()
  {
    let msgEmail = 'um email válido';
    let msgSenha = 'uma senha válida';
    let msgErro = 'Por favor digite ';

    !this.formulario.get('email').valid && this.formulario.get('senha').valid ? msgErro += msgEmail  : '';
    !this.formulario.get('senha').valid && this.formulario.get('email').valid ? msgErro += msgSenha  : '';
    !this.formulario.get('email').valid && !this.formulario.get('senha').valid ? msgErro += msgEmail + ' e ' + msgSenha : '';
    this.mostrarErro(msgErro + '!');
  }

  fazerCadastro() {
    this.router.navigateByUrl('tela-cadastro-login');
  }

  async mostrarErro(value:string) {
    const toast = await this.toastController.create({
      message: value,
      duration: 3000
    });
    toast.present();
  }

}
