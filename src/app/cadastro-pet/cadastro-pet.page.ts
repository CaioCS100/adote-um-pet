import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { PetService } from '../servicos/pet.service';
import { Camera } from '@ionic-native/camera/ngx';
import { UtilService } from '../servicos/util.service';
import { Pet } from '../models/pet';

@Component({
  selector: 'app-cadastro-pet',
  templateUrl: './cadastro-pet.page.html',
  styleUrls: ['./cadastro-pet.page.scss'],
})
export class CadastroPetPage implements OnInit {
  formulario:FormGroup;
  model:Pet;
  imagem = '../../assets/img/camera_on.png';
  nomeImg = null;
  estado = null;
  cidade = null;
  cidades = [];
  brasil:Object[];
  idades:Object[];

  constructor(private formBuilder: FormBuilder, private toastController: ToastController,
              private petDAO: PetService, private camera: Camera, private util: UtilService) { }

  ngOnInit() {
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

  tirarFoto() {
    this.camera.getPicture({
      cameraDirection: this.camera.Direction.BACK,
      allowEdit: true,
      quality: 100,
      saveToPhotoAlbum: false,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }).then(foto => {
      this.imagem = `data:image/jpeg;base64,${foto}`;
      this.nomeImg = 'pet';
    });
  }

  cadastrarPet()
  {
    if(this.formulario.valid)
    {
      this.model.nome = this.formulario.get('nome').value;
      this.model.sexo = this.formulario.get('sexo').value;
      this.model.genero = this.formulario.get('genero').value;
      this.model.telefone = this.formulario.get('telefone').value;
      this.model.estado = this.formulario.get('estado').value;
      this.model.cidade = this.formulario.get('cidade').value;
      this.model.idade = this.formulario.get('idade').value;
      
      if (this.petDAO.cadastrar(this.model, this.nomeImg, this.imagem))
      {
        this.mostrarMsg('Pet Cadastrado com sucesso');
        this.formulario.reset();
      }
    }
    else
      this.mostrarMsg('Preencha os campos');
  }

  async mostrarMsg(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
