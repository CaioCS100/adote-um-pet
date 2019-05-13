import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Pet } from '../models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private db: firebase.database.Reference;

  constructor() 
  { 
    let userID = firebase.auth().currentUser.uid;
    this.db = firebase.database().ref('pet').child(userID);
  }

  async cadastrar(model:Pet) {
    let today = new Date();
    let uid = this.db.push().key;
    model.id = uid;
    model.data_envio = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    model.adotado = false;
    if (model.pathImage == null)
      model.pathImage = '';

    await this.db.child(uid).set(model, function(error) {
      if (!error)
        return true;
    });

    return false;
  }
  
}
