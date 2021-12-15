import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CanActivateAdmin } from './classes/can-activate-admin';
import { CanActivateAnyUser } from './classes/can-activate-any-user';
import { CaseTableComponent } from './components/case-table/case-table.component';
import { CaseComponent } from './components/case/case.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { LoginComponent } from './components/login/login.component';
import { UpdateCaseComponent } from './components/update-case/update-case.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserTableComponent } from './components/user-table/user-table.component';

const routes: Routes = [
  {
    path: 'case/add',
    component: CaseComponent,
    canActivate: [CanActivateAnyUser],
  },
  {
    path: 'case/table',
    component: CaseTableComponent,
    canActivate: [CanActivateAnyUser],
  },
  {
    path: 'case/update',
    component: UpdateCaseComponent,
    canActivate: [CanActivateAnyUser],
  },
  {
    path: 'document/list/:caseId',
    component: DocumentListComponent,
    canActivate: [CanActivateAnyUser],
  },
  {
    path: 'user/add',
    component: UserCardComponent,
    canActivate: [CanActivateAnyUser],
  },
  {
    path: 'user/table',
    component: UserTableComponent,
    canActivate: [CanActivateAnyUser],
  },
  {
    path: 'user/update',
    component: UpdateUserComponent,
    canActivate: [CanActivateAnyUser],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateAnyUser, CanActivateAdmin],
})
export class AppRoutingModule {}
