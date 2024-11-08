import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {
  funcionario: Funcionario = { id: 0, nome: '', funcao: '', dataAdmissao: '', salario: 0 };
  editMode: boolean = false;

  constructor(
    private funcionarioService: FuncionarioService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      const funcionarioId = Number(id);
      const funcionario = this.funcionarioService.getFuncionarios().find(f => f.id === funcionarioId);
      if (funcionario) {
        this.funcionario = { ...funcionario }; // Preenche os dados do funcionário no formulário
      }
    }
  }

  salvarFuncionario(): void {
    if (this.editMode) {
      this.funcionarioService.editarFuncionario(this.funcionario.id, this.funcionario);
    } else {
      this.funcionario.id = this.funcionarioService.getFuncionarios().length + 1; // Gera um novo ID
      this.funcionarioService.addFuncionario(this.funcionario);
    }
    this.router.navigate(['/']); // Redireciona para a lista após o salvamento
  }
}