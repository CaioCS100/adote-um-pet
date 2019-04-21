import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../servicos/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-cadastro-login',
  templateUrl: './tela-cadastro-login.page.html',
  styleUrls: ['./tela-cadastro-login.page.scss'],
})
export class TelaCadastroLoginPage implements OnInit {

  formulario:FormGroup;
  
  constructor(private formBuilder: FormBuilder, private toastController: ToastController,
              private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      senha: ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  cadastrarConta()
  {
    if (this.formulario.valid)
    {
      this.authService.criarConta(this.formulario).then( resposta => {
        this.router.navigateByUrl('tela-inicial');
      }).catch(erro => {
        this.mostrarErro(erro.message);
      });
    }
    else
      this.verificarCamposComErro()
  }

  private verificarCamposComErro()
  {
    let msgEmail = 'um email válido';
    let msgSenha = 'uma senha válida e com no minimo 6 caracteres';
    let msgErro = 'Por favor digite ';

    !this.formulario.get('email').valid && this.formulario.get('senha').valid ? msgErro += msgEmail  : '';
    !this.formulario.get('senha').valid && this.formulario.get('email').valid ? msgErro += msgSenha  : '';
    !this.formulario.get('email').valid && !this.formulario.get('senha').valid ? msgErro += msgEmail + ' e ' + msgSenha : '';
    this.mostrarErro(msgErro + '!');
  }

  async mostrarErro(msgErro:string) {
    const toast = await this.toastController.create({
      message: msgErro,
      duration: 3000
    });
    toast.present();
  }

}
