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
  model:Pet;
  imagem = '../../assets/img/camera_on.png';
  nomeImg = null;
  estado = null;
  cidade = null;
  cidades = [];
  brasil:Object[];
  idades:Object[];

  constructor(private activitedRouted:ActivatedRoute, private formBuilder: FormBuilder, private toastController: ToastController,
    private petDAO: PetService, private camera: Camera, private util: UtilService) { }

  ngOnInit() {
    console.log(this.activitedRouted.snapshot.params['id']);
    this.brasil = this.util.getBrasil();
    this.idades = this.util.getIdades();
    this.model = new Pet();
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
      if (estado.sigla == this.estado)
        this.cidades = estado.cidades;
    });
  }

}
