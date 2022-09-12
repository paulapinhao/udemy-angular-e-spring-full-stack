import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'

import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component'

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas = ['foto', 'id', 'nome', 'email', 'favorito'];

  constructor(
    private contatoService: ContatoService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  /* Executa depois que o componente tiver sido mostrado na tela */
  ngOnInit(): void {
    this.montarFormulario();
    this.listarContatos();
  }

  montarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    })
  }

  listarContatos() {
    this.contatoService.list().subscribe(response => {
      this.contatos = response;
    })
  }

  favoritar(contato: Contato) {
    this.contatoService.favorite(contato).subscribe(response => {
      contato.favorito = !contato.favorito;
    })
  }

  submit() {
    const erroNomeRequired = this.formulario.get('nome')?.errors?.['required'];
    const erroEmailInvalido = this.formulario.get('email')?.errors?.['email'];

    const formValue = this.formulario.value;
    const contato: Contato = new Contato(formValue.nome, formValue.email);
    this.contatoService.save(contato).subscribe(resposta => {
      let listaContatos: Contato[] = [...this.contatos, resposta];
      this.contatos = listaContatos;
    })
  }

  uploadFoto(event: any, contato: Contato) {
    const files = event.target.files;
    if (files) {
      const foto = files[0];
      const formData : FormData = new FormData();
      formData.append("foto", foto);
      this.contatoService
          .upload(contato, formData)
          .subscribe(response => this.listarContatos());
    }
  }

  visualizarContato(contato: Contato) {
    this.dialog.open(ContatoDetalheComponent, {
      width: '400px',
      height: '450px',
      data: contato
    })
  }
}