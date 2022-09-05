import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { CursoAngularComponent } from './curso-angular/curso-angular.component';
import { TesteComponent } from './teste/teste.component';
import { ClientesModule } from './clientes/clientes.module';


@NgModule({
  /* Declara os componentes que deseja que façam parte desse módulo */
  declarations: [
    AppComponent,
    HelloComponent,
    CursoAngularComponent,
    TesteComponent
  ],

  /* Outros módulos que são necessários para esse módulo */
  imports: [
    BrowserModule,    /* Default: necessário para a aplicação rodar no módulo */
    AppRoutingModule,  /* Default: Navegação de componentes */
    ClientesModule
  ],

  /* Define os serviços */
  providers: [],

  /* Define a classe/componente que vai ser mostrado assim que inicializar a aplicação. 
     Essa propriedade só deve estar presente no módulo raiz/base/core/principal (app.module) */
  bootstrap: [AppComponent]
})
export class AppModule { }
