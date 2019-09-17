import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { OrderEditComponent } from './components/order-edit/order-edit.component';
import { OrderListComponent } from './components/order-list/order-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-order' },
  { path: 'create-order', component: OrderCreateComponent },
  { path: 'edit-order/:id', component: OrderEditComponent },
  { path: 'order-list', component: OrderListComponent }  
];


@NgModule({
  declarations: [
    AppComponent,
    OrderCreateComponent,
    OrderEditComponent,
    OrderListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:
   [RouterModule],
   providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
