import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { CaseComponent } from './components/case/case.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressCardComponent } from './components/address-card/address-card.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ProceedingsSubjectCardComponent } from './components/proceedings-subject-card/proceedings-subject-card.component';
import { ClientAndAdversePartyCardComponent } from './components/client-and-adverse-party-card/client-and-adverse-party-card.component';
import { CourtCardComponent } from './components/court-card/court-card.component';
import { AdversePartyAttorenyCardComponent } from './components/adverse-party-attoreny-card/adverse-party-attoreny-card.component';
import { JudgingPanelCardComponent } from './components/judging-panel-card/judging-panel-card.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CaseTableComponent } from './components/case-table/case-table.component';
import { CaseStatusChangeDialogComponent } from './components/case-status-change-dialog/case-status-change-dialog.component';
import { UpdateCaseComponent } from './components/update-case/update-case.component';
import { DocumentCardComponent } from './components/document-card/document-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CaseComponent,
    AddressCardComponent,
    ProceedingsSubjectCardComponent,
    ClientAndAdversePartyCardComponent,
    CourtCardComponent,
    AdversePartyAttorenyCardComponent,
    JudgingPanelCardComponent,
    ConfirmationDialogComponent,
    CaseTableComponent,
    CaseStatusChangeDialogComponent,
    UpdateCaseComponent,
    DocumentCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
