import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CaseTableComponent } from './components/case-table/case-table.component';
import { CaseComponent } from './components/case/case.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { LoginComponent } from './components/login/login.component';
import { UpdateCaseComponent } from './components/update-case/update-case.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserTableComponent } from './components/user-table/user-table.component';

const routes: Routes = [
  { path: 'case/add', component: CaseComponent },
  { path: 'case/table', component: CaseTableComponent },
  { path: 'case/update', component: UpdateCaseComponent },
  { path: 'document/list/:caseId', component: DocumentListComponent },
  { path: 'user/add', component: UserCardComponent },
  { path: 'user/table', component: UserTableComponent },
  { path: 'user/update', component: UpdateUserComponent },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
