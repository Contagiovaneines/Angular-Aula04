import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css']
})
export class FuncionarioListComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  pesquisa: string = '';  // Variável para armazenar o texto da pesquisa
  mostrarAlerta: boolean = false;  // Controla a exibição do alerta
  confirmarId: number = 0;  // Armazena o ID do funcionário a ser deletado

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.funcionarios = this.funcionarioService.getFuncionarios();
  }

  confirmarDelecao(id: number): void {
    this.confirmarId = id;
    this.mostrarAlerta = true;  // Exibe o alerta
  }

  deletarFuncionario(id: number): void {
    this.funcionarioService.deletarFuncionario(id);
    this.funcionarios = this.funcionarioService.getFuncionarios(); // Atualiza a lista após exclusão
    this.mostrarAlerta = false; // Oculta o alerta após deletar
  }

  cancelarDelecao(): void {
    this.mostrarAlerta = false; // Oculta o alerta se o usuário clicar em "Não"
  }
}
