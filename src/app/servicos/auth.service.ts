import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth : AngularFireAuth) { }

  verificarLogin(formulario:FormGroup)
  {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(formulario.get('email').value, 
      formulario.get('senha').value).then(user => {
        resolve(user);
      }).catch(err => reject(err));
    }); 
  }

  criarConta(formulario:FormGroup)
  {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(formulario.get('email').value,
       formulario.get('senha').value).then(res => {
          res.user.updateProfile({
            displayName: formulario.get('nome').value
          }).then(resposta => {
            resolve(resposta);
          });
      }).catch( err => reject(err))
    })
  }

  deslogar()
  {
    return new Promise((resolve, reject) => {
      if (this.angularFireAuth.auth.currentUser) {
        this.angularFireAuth.auth.signOut();
        resolve();
      }
      else
        reject();
    });
  }
}
