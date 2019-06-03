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
    firebase.auth().onAuthStateChanged(user => {
      let userID = user.uid;
      this.db = firebase.database().ref('pet').child(userID);
    }); 
  }

  async cadastrar(model:Pet, nomeFoto, arquivo) {
    let today = new Date();
    let uid = this.db.push().key;
    model.id = uid;
    model.data_envio = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    model.adotado = false;
    nomeFoto != null ? model.pathImages.push(nomeFoto) : model.pathImages = [];

    await this.db.child(uid).set(model, function(error) {
      if (error)
        return false;
    }).then(doc => {
      if (model.pathImages.length > 0)
      {
        var storage = firebase.storage().ref('pets').child(model.id);
        var imagesRef = storage.child(model.pathImages[0]);
        imagesRef.putString(arquivo, 'data_url');
        return true;
      }
    });

    return false;
  }

}
