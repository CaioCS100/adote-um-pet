import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pet } from '../models/pet';
import { ToastController } from '@ionic/angular';
import { UtilService } from '../servicos/util.service';
import { PetService } from '../servicos/pet.service';

@Component({
  selector: 'app-visualizar-pet',
  templateUrl: './visualizar-pet.page.html',
  styleUrls: ['./visualizar-pet.page.scss'],
})
export class VisualizarPetPage implements OnInit {
  formulario:FormGroup;
  model:Pet = new Pet();
  imagem = '../../assets/img/camera_on.png';
  nomeImg = null;
  cidade = null;
  cidades = [];
  brasil:Object[];
  idades:Object[];

  constructor(private activitedRouted:ActivatedRoute, private formBuilder: FormBuilder, private toastController: ToastController,
    private petDAO: PetService, private util: UtilService) { }

  ngOnInit() {
    this.brasil = this.util.getBrasil();
    this.idades = this.util.getIdades();
    this.petDAO.procurarPet(this.activitedRouted.snapshot.params['id']).then(result => {
      this.model = result;
      this.petDAO.procurarImg(this.model.pathImages, this.model.id).then(img => {
        this.model.pathImages = img;
      });
    });
    this.formulario = this.formBuilder.group({
      nome: ['',[Validators.required]],
      sexo: ['',[Validators.required]],
      genero: ['',[Validators.required]],
      telefone: ['',[Validators.required]],
      estado: ['',[Validators.required]],
      cidade: ['',[Validators.required]],
      idade: ['',[Validators.required]]
    });
  }

  getCidades()
  {
    this.util.getBrasil().forEach(estado => {
      if (estado.sigla == this.model.estado)
        this.cidades = estado.cidades;
    });
  }

  adotar()
  {
    this.petDAO.getKey(this.model.id).then(chave => {
      this.petDAO.getIdUser().then(user => {
        this.model.adotado = user;
        this.petDAO.adotarPet(this.model, chave).then(msg => {
          console.log(msg);
          
        });
      });

      
      console.log(chave);
    });
  }

}
