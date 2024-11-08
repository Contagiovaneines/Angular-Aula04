import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioListComponent } from './components/funcionario-list/funcionario-list.component';
import { FuncionarioFormComponent } from './components/funcionario-form/funcionario-form.component';

const routes: Routes = [
  {path: '', component: FuncionarioListComponent},
  {path: 'funcionario/new', component: FuncionarioFormComponent},
  {path: 'funcionario/edit/:id', component: FuncionarioFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
