import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from '../../clientes.service';
import { ServicoPrestado } from '../servicoPrestado';
import { ServicoPrestadoService } from '../../servico-prestado.service'

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  /* Array para permitir selecionar o cliente (combobox) ao cadastrar o serviço prestado */
  clientes: Cliente[] = []; 
  servicoPrestado: ServicoPrestado;
  success: boolean = false;
  errors: String[];

  constructor(
    private clientesService: ClientesService,
    private servicoPrestadoService: ServicoPrestadoService
    ) { 
      this.servicoPrestado = new ServicoPrestado();
    }

  ngOnInit(): void {
    this.clientesService
      .getClientes()
      .subscribe( response => this.clientes = response );
  }

  onSubmit() {
    this.servicoPrestadoService
      .salvar(this.servicoPrestado)
      .subscribe(response => {
        this.success = true;
        this.errors = null;
        this.servicoPrestado = new ServicoPrestado();
      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })
  }
}
