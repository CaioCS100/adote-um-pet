import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth : AngularFireAuth) { }

  login(email:string, senha:string)
  {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(email, senha).then(user => {
        resolve(user);
      }).catch(err => reject(err));
    }); 
  }
}
