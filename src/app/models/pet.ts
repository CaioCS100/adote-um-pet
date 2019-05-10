export class Pet {

    constructor(public nome:string, public sexo:string,
                public genero:string, public telefone:number,
                public estado:string, public cidade:string,
                public data:string, public id?:string,
                public imagem: string = '/assets/imgs/camera_on.png') { }
}
