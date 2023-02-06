import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsyncComponent } from './async/async.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { SelectFiveComponent } from './select/select-five/select-five.component';
import { SelectFourComponent } from './select/select-four/select-four.component';
import { SelectOneComponent } from './select/select-one/select-one.component';
import { SelectThreeComponent } from './select/select-three/select-three.component';
import { SelectTwoComponent } from './select/select-two/select-two.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { TemplateSwapComponent } from './template-swap/template-swap.component';

export const routes: Routes = [
  { path: '', component: ReactiveformComponent },
  { path: 'subs', component: SubscriptionComponent },
  { path: 'async', component: AsyncComponent },
  { path: 'selectone', component: SelectOneComponent },
  { path: 'selecttwo', component: SelectTwoComponent },
  { path: 'selectthree', component: SelectThreeComponent },
  { path: 'selectfour', component: SelectFourComponent },
  { path: 'selectfive', component: SelectFiveComponent },
  { path: 'swap', component: TemplateSwapComponent },
  { path: 'sand', component: SandboxComponent },
  { path: 'rxform', component: ReactiveformComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
