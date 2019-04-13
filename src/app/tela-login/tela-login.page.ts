import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.page.html',
  styleUrls: ['./tela-login.page.scss'],
})
export class TelaLoginPage implements OnInit {

  formulario:FormGroup;

  constructor(private formBuilder: FormBuilder, private toastController: ToastController,
              private router: Router) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      senha: ['',[Validators.required]]
    });
  }

  fazerLogin() {
    if(this.formulario.valid && this.formulario.get('email').value == "teste@teste.com" &&
      this.formulario.get('senha').value == "123") 
    {
      this.router.navigateByUrl('tela-inicial');
    }
    else
    {
      console.log("entrou aqui");
      
      this.mostrarErro();
    }
  }

  async mostrarErro() {
    const toast = await this.toastController.create({
      message: 'Login ou senha incorreta!',
      duration: 3000
    });
    toast.present();
  }

}
