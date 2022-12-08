import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

//primeface
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { RouterModule, Routes } from '@angular/router';

import { EnterpriseService } from './enterprise/enterprise.service';
import { FormComponent } from './enterprise/form.component';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'enterprises', component: EnterpriseComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    DirectivaComponent,
    EnterpriseComponent,
    FormComponent,
    NopagefoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ButtonModule,
    MenubarModule,
    InputTextModule,
    InputTextareaModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    DialogModule,
    ConfirmDialogModule

  ],
  providers: [

    EnterpriseService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
