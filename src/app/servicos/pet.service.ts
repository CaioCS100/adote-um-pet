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
  
  async procurarPets(estado:string, cidade:string)
  {
    var dados = [];
    
    await firebase.database().ref('/pet').once('value').then(snapshot => {
      snapshot.forEach(snap => {
        snap.forEach(pet => {
          if(pet.val().genero == 'Cachorro' && pet.val().estado == estado && pet.val().cidade == cidade && pet.val().adotado == false)
          dados.push({id: pet.val().id, nome: pet.val().nome, nomeImgs: pet.val().pathImages, urlFotos: []});
        });
      });
    });
    
    return dados;
  }

  async getIdUser()
  {
    return firebase.auth().currentUser.uid;
  }

  async adotarPet(pet:Pet, key:string)
  {
    var resposta = true;
    var banco = firebase.database().ref('pet').child(key);
    banco.child(pet.id).set(pet, function (error) {
      if(error)
        console.log(error);
        resposta = false;
    });
    return resposta;
  }

  async getKey(idPet:string)
  {
    return firebase.database().ref('/pet').once('value').then(snapshot => {
      let chave = null;
      snapshot.forEach(snapshot1 => {
        //Aqui eu verifico se o primeiro valor do snapshot1 é igual ao valor que vem da URL
        //Se for igual eu guardo a key do snapshot1 (que seria a chave para poder editar o usuario)
          var valores = [];
          valores = Object.keys(snapshot1.val());
          valores.map(function (valor) {
            if (valor == idPet)
              chave = snapshot1.key;
        });
      });
      return chave;
    });
  }
  
  async procurarPet(idPet:string)
  {
    return firebase.database().ref('/pet').once('value').then(snapshot => {
      let obj = null;
      snapshot.forEach(snapshot1 => {
        snapshot1.forEach(snap => {
          if(snap.val().id === idPet)
            obj = snap.val();
        });
      });
      return obj;
    });
  }
  
  async procurarImg(nomeImgs:string[] ,id:string)
  {
    var urls = []
    for (let index = 0; index < nomeImgs.length; index++) 
    {
      await firebase.storage().ref('pets').child(id).child(nomeImgs[index]).getDownloadURL().then(url => {
        urls.push(url);
      }).catch(erro => {
        console.log(erro);
      });
    }
    
    return urls;
  }
  
  async cadastrar(model:Pet, nomeFoto, arquivo) {
    let today = new Date();
    let uid = this.db.push().key;
    model.id = uid;
    model.data_envio = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    model.adotado = 'false';
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
