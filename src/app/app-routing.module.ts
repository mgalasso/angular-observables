import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsyncComponent } from './async/async.component';
import { ParentchildComponent } from './parentchild/parentchild.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { SelectFourComponent } from './select/select-four/select-four.component';
import { SelectOneComponent } from './select/select-one/select-one.component';
import { SelectTwoComponent } from './select/select-two/select-two.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { TemplateSwapComponent } from './template-swap/template-swap.component';
import { TemplatedformComponent } from './templatedform/templatedform.component';
import { CarsComponent } from './cars/cars.component';
import { MapComponent } from './map/map.component';
import { SelectThreeComponent } from './select/select-three/select-three.component';
import { ZipComponent } from './zip/zip.component';
import { SwitchComponent } from './switch/switch.component';


export const routes: Routes = [
  { path: '', component: SandboxComponent },
  { path: 'subs', component: SubscriptionComponent },
  { path: 'async', component: AsyncComponent },
  { path: 'withlatest', component: SelectOneComponent },
  { path: 'selecttwo', component: SelectTwoComponent },
  { path: 'selectthree', component: SelectThreeComponent },
  { path: 'selectfour', component: SelectFourComponent },
  { path: 'map', component: MapComponent },
  { path: 'swap', component: TemplateSwapComponent },
  { path: 'sand', component: SandboxComponent },
  { path: 'rxform', component: ReactiveformComponent },
  { path: 'tempform', component: TemplatedformComponent },
  { path: 'forkjoin', component: ParentchildComponent },
  { path: 'combinelatest', component: CarsComponent },
  { path: 'zip', component: ZipComponent },
  { path: 'switch', component: SwitchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
