# Projeto: Aula04
![projeto](projeto.gif)

## Descrição
Este é um projeto de aplicação Angular para gerenciar uma lista de funcionários. A aplicação permite adicionar, editar, excluir e pesquisar funcionários através de uma interface simples. O projeto utiliza componentes, serviços, e Pipes personalizados para manipulação e exibição dos dados.

## Estrutura do Projeto

A estrutura de diretórios e arquivos do projeto está organizada da seguinte forma:

```
src/
 └── app/
      ├── components/                       # Componentes da aplicação
      │    ├── funcionario-list/            # Componente para listar funcionários
      │    │    ├── funcionario-list.component.html
      │    │    └── funcionario-list.component.ts
      │    └── funcionario-form/            # Componente para o formulário de funcionário
      │         ├── funcionario-form.component.html
      │         └── funcionario-form.component.ts
      ├── models/                           # Modelos de dados
      │    └── funcionario.model.ts
      ├── services/                         # Serviços da aplicação
      │    └── funcionario.service.ts
      ├── pipes/                            # Pipes personalizados
      │    └── filter.pipe.ts              # Pipe para filtro de funcionários
      ├── app-routing.module.ts             # Configuração de rotas da aplicação
      ├── app.component.html               # Template principal da aplicação
      ├── app.component.ts                 # Lógica principal do componente
      ├── app.module.ts                    # Módulo principal da aplicação
```

## Detalhamento dos Componentes

### 1. **Componente `FuncionarioListComponent`**

**Arquivo:** `funcionario-list.component.ts` e `funcionario-list.component.html`

Este componente é responsável por exibir a lista de funcionários e permitir a pesquisa, edição e exclusão.

- **Pesquisa:** A lista de funcionários pode ser filtrada com base em um nome ou função utilizando o `ngModel`.
- **Exclusão:** Há um botão de exclusão que chama o método `deletarFuncionario()`.
- **Edição:** Cada funcionário pode ser editado ao clicar no botão "Editar", que redireciona para o formulário de edição.

```html
<div class="container mt-4">
    <h2>Lista de Funcionários</h2>

    <!-- Campo de pesquisa -->
    <input type="text" class="form-control mb-3" [(ngModel)]="pesquisa" placeholder="Pesquisar por nome ou função">

    <table class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Função</th>
                <th>Data de Admissão</th>
                <th>Salário</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let funcionario of funcionarios | filter:pesquisa">
                <td>{{ funcionario.id }}</td>
                <td>{{ funcionario.nome }}</td>
                <td>{{ funcionario.funcao }}</td>
                <td>{{ funcionario.dataAdmissao }}</td>
                <td>{{ funcionario.salario | currency:'BRL' }}</td>
                <td>
                    <button class="btn btn-outline-danger btn-sm me-3" (click)="deletarFuncionario(funcionario.id)">
                        <i class="bi bi-trash"></i> Deletar
                    </button>
                    <button class="btn btn-outline-warning btn-sm" [routerLink]="['/funcionario/edit', funcionario.id]">
                        <i class="bi bi-pencil-square"></i> Editar
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <button class="btn btn-primary" [routerLink]="['/funcionario/new']">Adicionar Novo Funcionário</button>
</div>
```

**Explicação do Componente:**
- A lista de funcionários é preenchida a partir do serviço `FuncionarioService`.
- A pesquisa é feita usando um Pipe personalizado chamado `filter`.
- A exclusão de funcionários é tratada diretamente no componente, atualizando a lista após a remoção.

### 2. **Componente `FuncionarioFormComponent`**

**Arquivo:** `funcionario-form.component.ts` e `funcionario-form.component.html`

Este componente é utilizado para adicionar e editar funcionários. O formulário contém campos como ID, nome, função, data de admissão e salário.

- **Modo de Edição:** Caso o componente esteja em modo de edição, o título e a lógica do botão mudam para "Salvar".
- **Adição de Funcionário:** Ao adicionar um novo funcionário, um ID é gerado automaticamente.

```html
<div class="container mt-5">
    <h2 class="mb-4 text-center">{{ editMode ? 'Editar Funcionário' : 'Adicionar Funcionário' }}</h2>
    <form (ngSubmit)="salvarFuncionario()">
        <div class="row">
            <!-- ID -->
            <div class="col-md-6 mb-3">
                <label for="id" class="form-label">ID:</label>
                <input type="number" id="id" [(ngModel)]="funcionario.id" name="id" class="form-control" [disabled]="editMode" />
            </div>
            <!-- Nome -->
            <div class="col-md-6 mb-3">
                <label for="nome" class="form-label">Nome:</label>
                <input type="text" id="nome" [(ngModel)]="funcionario.nome" name="nome" class="form-control" required />
            </div>
        </div>
        
        <div class="row">
            <!-- Função -->
            <div class="col-md-6 mb-3">
                <label for="funcao" class="form-label">Função:</label>
                <input type="text" id="funcao" [(ngModel)]="funcionario.funcao" name="funcao" class="form-control" required />
            </div>
            <!-- Data de Admissão -->
            <div class="col-md-6 mb-3">
                <label for="dataAdmissao" class="form-label">Data de Admissão:</label>
                <input type="date" id="dataAdmissao" [(ngModel)]="funcionario.dataAdmissao" name="dataAdmissao" class="form-control" required />
            </div>
        </div>

        <div class="row">
            <!-- Salário -->
            <div class="col-md-6 mb-3">
                <label for="salario" class="form-label">Salário:</label>
                <input type="number" id="salario" [(ngModel)]="funcionario.salario" name="salario" class="form-control" required />
            </div>
        </div>

        <div class="d-flex justify-content-between mt-4">
            <button type="submit" class="btn btn-primary">{{ editMode ? 'Salvar' : 'Adicionar' }}</button>
            <button type="button" class="btn btn-secondary" (click)="router.navigate(['/'])">Cancelar</button>
        </div>
    </form>
</div>
```

**Explicação do Componente:**
- O formulário pode ser usado para editar ou adicionar funcionários, dependendo do estado do componente.
- O modo de edição é controlado pela variável `editMode`.

## Explicação do Pipe

### **Pipe `FilterPipe`**

**Arquivo:** `filter.pipe.ts`

O Pipe `FilterPipe` é utilizado para filtrar a lista de funcionários com base no texto digitado na barra de pesquisa. Ele faz uma busca nos campos `nome` e `funcao` de cada funcionário.

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;

        searchText = searchText.toLowerCase();
        return items.filter(item =>
            item.nome.toLowerCase().includes(searchText) ||
            item.funcao.toLowerCase().includes(searchText)
        );
    }
}
```

**Explicação do Pipe:**
- O Pipe recebe dois parâmetros: `items` (a lista de funcionários) e `searchText` (o texto que o usuário está procurando).
- Se o `searchText` estiver vazio, o Pipe retorna todos os itens.
- Caso contrário, ele filtra a lista verificando se o `nome` ou a `funcao` do funcionário contém o texto de pesquisa (sem diferenciar maiúsculas e minúsculas).

## Serviços

### **Serviço `FuncionarioService`**

Este serviço é responsável por manipular a lista de funcionários, incluindo adicionar, editar, excluir e obter os dados.

```typescript
@Injectable({
    providedIn: 'root'
})
export class FuncionarioService {
    private funcionarios: Funcionario[] = [
        { id: 1, nome: 'Giovane', funcao: 'Dev Jr', dataAdmissao: '12/05/2024', salario: 6890.98 },
        // Outros funcionários...
    ];

    getFuncionarios(): Funcionario[] {
        return this.funcionarios;
    }

    addFuncionario(funcionario: Funcionario): void {
        this.funcionarios.push(funcionario);
    }

    editarFuncionario(id: number, funcionario

: Funcionario): void {
        const index = this.funcionarios.findIndex(f => f.id === id);
        if (index !== -1) {
            this.funcionarios[index] = funcionario;
        }
    }

    deletarFuncionario(id: number): void {
        const index = this.funcionarios.findIndex(f => f.id === id);
        if (index !== -1) {
            this.funcionarios.splice(index, 1);
        }
    }
}
```

**Explicação do Serviço:**
- Este serviço mantém um array estático de funcionários (`funcionarios`) e oferece métodos para adicionar, editar, excluir e obter funcionários.

## Conclusão

Este projeto Angular apresenta uma aplicação de gerenciamento de funcionários com funcionalidades básicas como CRUD e filtro. O Pipe `FilterPipe` permite a filtragem eficiente da lista, e a estrutura do projeto segue boas práticas de organização, separando as responsabilidades entre componentes, serviços e pipes.

