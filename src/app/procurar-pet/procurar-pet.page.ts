import { Component, OnInit } from '@angular/core';
import { UtilService } from '../servicos/util.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PetService } from '../servicos/pet.service';

@Component({
  selector: 'app-procurar-pet',
  templateUrl: './procurar-pet.page.html',
  styleUrls: ['./procurar-pet.page.scss'],
})
export class ProcurarPetPage implements OnInit {
  formulario:FormGroup;
  estado = null;
  cidade = null;
  cidades = [];
  animais = [];
  brasil:Object[];

  constructor(private formBuilder: FormBuilder, private util: UtilService,
              private dao: PetService) { }

  ngOnInit() {
    this.brasil = this.util.getBrasil();
    this.formulario = this.formBuilder.group({
      estado: ['',[Validators.required]],
      cidade: ['',[Validators.required]],
    });
  }

  getCidades()
  {
    this.util.getBrasil().forEach(estado => {
      if (estado.sigla == this.estado)
        this.cidades = estado.cidades;
    });
  }

  procurar()
  {
    if(this.formulario.valid)
    {
      this.dao.procurarPets(this.formulario.get('estado').value, this.formulario.get('cidade').value).then(result => {
        result.map(pet => {
            this.dao.procurarImg(pet.nomeImgs, pet.id).then(resultFotos => {
              this.animais.push({id: pet.id, nome: pet.nome, nomeImgs: pet.nomeImgs, urlFotos: resultFotos});
          });
        });
      });
    }
  }

  visualizar(t)
  {
    console.log('aqui');
    console.log(t);
    
  }

  habilitarBusca()
  {
    var elemento = document.querySelector("#buscar");
    var div = document.querySelector("#procurar");
    
    div.classList.remove('esconder');
    elemento.classList.add('esconder');
  }

}
