// src/app/services/funcionario.service.ts
import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
    providedIn: 'root'
})

export class FuncionarioService {
    private funcionarios: Funcionario[] = [
        { id: 1, nome: 'Giovane', funcao: 'Dev Jr', dataAdmissao: '12/05/2024', salario: 6890.98 },
        { id: 2, nome: 'Ana', funcao: 'Analista de Sistemas', dataAdmissao: '03/07/2023', salario: 7500.00 },
        { id: 3, nome: 'Pedro', funcao: 'Dev Sr', dataAdmissao: '15/09/2021', salario: 12500.25 },
        { id: 4, nome: 'Mariana', funcao: 'Gerente de Projetos', dataAdmissao: '22/01/2020', salario: 15800.40 },
        { id: 5, nome: 'Carlos', funcao: 'Devops', dataAdmissao: '30/11/2022', salario: 9500.80 },
        { id: 6, nome: 'Julia', funcao: 'Scrum Master', dataAdmissao: '17/02/2023', salario: 10120.55 },
        { id: 7, nome: 'Rafael', funcao: 'UI/UX Designer', dataAdmissao: '25/05/2024', salario: 8200.75 },
        { id: 8, nome: 'Sofia', funcao: 'QA Tester', dataAdmissao: '08/10/2022', salario: 6900.10 },
        { id: 9, nome: 'Lucas', funcao: 'Engenheiro de Software', dataAdmissao: '11/06/2021', salario: 13500.00 },
        { id: 10, nome: 'Beatriz', funcao: 'Product Owner', dataAdmissao: '04/04/2024', salario: 14800.65 }


    ];
    constructor() { }

    getFuncionarios(): Funcionario[]{
        return this.funcionarios
    }

    addFuncionario(funcionario: Funcionario): void {
        this.funcionarios.push(funcionario);
    }

    editarFuncionario(id: number, funcionario: Funcionario): void {
        const index = this.funcionarios.findIndex(f => f.id === id);
        if (index !== -1) {
            this.funcionarios[index] = funcionario;
        }
    }

    deletarFuncionario(id: number): void {
        this.funcionarios = this.funcionarios.filter(f => f.id !== id);
    }
}