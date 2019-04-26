import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { FormGroup } from '@angular/forms';

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

  cadastrar(formulario:FormGroup) {
    let uid = this.db.push().key;
    let pet = {
      id: uid,
      nome: formulario.get('nome').value,
      sexo: formulario.get('sexo').value,
      tipo: formulario.get('tipo').value,
      telefone: formulario.get('telefone').value,
      estado: formulario.get('estado').value
    };

    console.log(pet);
    
    this.db.child(uid).set(pet);

  }
}
