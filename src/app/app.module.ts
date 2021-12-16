import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { CaseComponent } from './components/case/case.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressCardComponent } from './components/address-card/address-card.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ProceedingCardComponent } from './components/proceeding-card/proceeding-card.component';
import { ClientAndAdversePartyCardComponent } from './components/client-and-adverse-party-card/client-and-adverse-party-card.component';
import { CourtCardComponent } from './components/court-card/court-card.component';
import { AdversePartyAttorenyCardComponent } from './components/adverse-party-attoreny-card/adverse-party-attoreny-card.component';
import { EntitiesCardComponent } from './components/entities-card/entities-card.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CaseTableComponent } from './components/case-table/case-table.component';
import { CaseStatusChangeDialogComponent } from './components/case-status-change-dialog/case-status-change-dialog.component';
import { UpdateCaseComponent } from './components/update-case/update-case.component';
import { DocumentCardComponent } from './components/document-card/document-card.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './classes/auth-interceptor';
import { ValueValidatorDirective } from './directives/value-validator-directive';
import { CanActivateAdmin } from './classes/can-activate-admin';
import { CanActivateAnyUser } from './classes/can-activate-any-user';

@NgModule({
  declarations: [
    AppComponent,
    CaseComponent,
    AddressCardComponent,
    ProceedingCardComponent,
    ClientAndAdversePartyCardComponent,
    CourtCardComponent,
    AdversePartyAttorenyCardComponent,
    EntitiesCardComponent,
    ConfirmationDialogComponent,
    CaseTableComponent,
    CaseStatusChangeDialogComponent,
    UpdateCaseComponent,
    DocumentCardComponent,
    DocumentListComponent,
    UserCardComponent,
    UserTableComponent,
    UpdateUserComponent,
    LoginComponent,
    ValueValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule {}
