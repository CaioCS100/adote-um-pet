import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { PetService } from '../servicos/pet.service';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-cadastro-pet',
  templateUrl: './cadastro-pet.page.html',
  styleUrls: ['./cadastro-pet.page.scss'],
})
export class CadastroPetPage implements OnInit {
  formulario:FormGroup;
  estado = null;
  estadoSelecionado = [];
  estados = [
    'Acre',
    'Alagoas',
    'Amapá',
    'Amazonas',
    'Bahia',
    'Ceará',
    'Distrito Federal',
    'Espírito Santo',
    'Goiás',
    'Maranhão',
    'Mato Grosso',
    'Mato Grosso do Sul',
    'Minas Gerais',
    'Pará',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio de Janeiro',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraima',
    'Santa Catarina',
    'São Paulo',
    'Sergipe',
    'Tocantins'
  ];

  constructor(private formBuilder: FormBuilder, private toastController: ToastController,
              private petDAO: PetService, private camera: Camera) { }

              imagem = '../../assets/img/camera_on.png';

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: ['',[Validators.required]],
      telefone: ['',[Validators.required]],
      tipo: ['',[Validators.required]],
      sexo: ['',[Validators.required]],
      estado: ['',[Validators.required]]
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
      this.imagem = 'data:image/jpeg;base64,'+foto;
    });
  }

  cadastrarPet()
  {
    if(this.formulario.valid)
    {
      this.petDAO.cadastrar(this.formulario);
    }
    else
      this.mostrarErro();
  }

  async mostrarErro() {
    const toast = await this.toastController.create({
      message: 'Preencha os campos',
      duration: 3000
    });
    toast.present();
  }

}
