import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { CaseComponent } from './components/case/case.component';
import { FormsModule } from '@angular/forms';
import { AddressCardComponent } from './components/address-card/address-card.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ProceedingsSubjectCardComponent } from './components/proceedings-subject-card/proceedings-subject-card.component';
import { ClientAndAdversePartyCardComponent } from './components/client-and-adverse-party-card/client-and-adverse-party-card.component';
import { CourtCardComponent } from './components/court-card/court-card.component';
import { AdversePartyAttorenyCardComponent } from './components/adverse-party-attoreny-card/adverse-party-attoreny-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CaseComponent,
    AddressCardComponent,
    ProceedingsSubjectCardComponent,
    ClientAndAdversePartyCardComponent,
    CourtCardComponent,
    AdversePartyAttorenyCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
