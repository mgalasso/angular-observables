import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeginComponent } from './begin/begin.component';

import { ImproveComponent } from './improve/improve.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { SelectFiveComponent } from './select/select-five/select-five.component';
import { SelectFourComponent } from './select/select-four/select-four.component';
import { SelectOneComponent } from './select/select-one/select-one.component';
import { SelectThreeComponent } from './select/select-three/select-three.component';
import { SelectTwoComponent } from './select/select-two/select-two.component';
import { TemplateSwapComponent } from './template-swap/template-swap.component';

export const routes: Routes = [
  { path: '', component: SandboxComponent },
  { path: 'begin', component: BeginComponent },
  { path: 'improve', component: ImproveComponent },
  { path: 'selectone', component: SelectOneComponent },
  { path: 'selecttwo', component: SelectTwoComponent },
  { path: 'selectthree', component: SelectThreeComponent },
  { path: 'selectfour', component: SelectFourComponent },
  { path: 'selectfive', component: SelectFiveComponent },
  { path: 'swap', component: TemplateSwapComponent },
  { path: 'sand', component: SandboxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
