import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FuncionarioListComponent } from './components/funcionario-list/funcionario-list.component';
import { FuncionarioFormComponent } from './components/funcionario-form/funcionario-form.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';  // Importando o pipe


@NgModule({
  declarations: [
    AppComponent,
    FuncionarioListComponent,
    FuncionarioFormComponent,
    FilterPipe  // Declarando o pipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FormsModule  // Importando FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
