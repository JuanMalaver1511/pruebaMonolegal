import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewdataComponent } from './components/viewdata/viewdata.component';
import { SendemailComponent } from './components/sendemail/sendemail.component';

const routes: Routes = [{ path: 'Facturas', component: ViewdataComponent}, 
{ path: 'Enviar/:codigoFactura', component: SendemailComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
