import { Component } from '@angular/core'

@Component({
    selector: 'hello',
    templateUrl: './hello.component.html'
})

/* Torna a classe pública */
export class HelloComponent {
    nome : string;
    clientes: Cliente[]; 

    constructor() {
        this.nome = 'Fulano';

        let fulano = new Cliente('Fulano', 10);
        let cicrano = new Cliente('Cicrano', 20);
        let outro = new Cliente('Outro', 30);
  
        this.clientes = [fulano, cicrano, outro];
    }
}

class Cliente {
    constructor(public nome: string,
                public idade: number) {
        this.nome = nome;
        this.idade = idade;        
    }  
}