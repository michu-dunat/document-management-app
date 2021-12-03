import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseTableComponent } from './components/case-table/case-table.component';
import { CaseComponent } from './components/case/case.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { UpdateCaseComponent } from './components/update-case/update-case.component';
import { UserCardComponent } from './components/user-card/user-card.component';

const routes: Routes = [
  { path: 'case/add', component: CaseComponent },
  { path: 'case/table', component: CaseTableComponent },
  { path: 'case/update', component: UpdateCaseComponent },
  { path: 'document/list/:caseId', component: DocumentListComponent },
  { path: 'user/add', component: UserCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
