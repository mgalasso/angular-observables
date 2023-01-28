import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeginComponent } from './begin/begin.component';
import { DetailComponent } from './detail/detail.component';
import { ImproveComponent } from './improve/improve.component';

export const routes: Routes = [
  { path: '', component: DetailComponent },
  { path: 'begin', component: BeginComponent },
  { path: 'improve', component: ImproveComponent },
  { path: 'detail', component: DetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
