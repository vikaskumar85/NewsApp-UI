import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewNewsComponent } from './viewnews/viewnews.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: ViewNewsComponent },
  { path: 'View', component: ViewNewsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
