import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'

import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component'
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas = ['foto', 'id', 'nome', 'email', 'favorito'];

  totalElementos = 0;
  pagina = 0; /* 1a página */
  tamanhoPagina = 10;
  pageSizeOptions: number[] = [10];

  constructor(
    private contatoService: ContatoService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  /* Executa depois que o componente tiver sido mostrado na tela */
  ngOnInit(): void {
    this.montarFormulario();
    this.listarContatos(this.pagina, this.tamanhoPagina);
  }

  montarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    })
  }

  listarContatos(pagina = 0, tamanhoPagina = 10) {
    this.contatoService.list(pagina, tamanhoPagina).subscribe(response => {
      this.contatos = response.content;
      this.totalElementos = response.totalElements;
    })
  }

  favoritar(contato: Contato) {
    this.contatoService.favorite(contato).subscribe(response => {
      contato.favorito = !contato.favorito;
    })
  }

  submit() {
    const formValue = this.formulario.value;
    const contato: Contato = new Contato(formValue.nome, formValue.email);
    this.contatoService.save(contato).subscribe(resposta => {
      this.listarContatos();
      this.snackBar.open('O Contato foi adicionado!', 'Sucesso!', {
        duration: 2000
      })
      this.formulario.reset();
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
          .subscribe(response => this.listarContatos(this.pagina, this.tamanhoPagina));
    }
  }

  visualizarContato(contato: Contato) {
    this.dialog.open(ContatoDetalheComponent, {
      width: '400px',
      height: '450px',
      data: contato
    })
  }

  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.tamanhoPagina = event.pageSize;
    this.listarContatos(this.pagina, this.tamanhoPagina);
  }
}
