import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrComponent } from './qr.component';

const routes: Routes = [
  {
    path: '',
    component: QrComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrreaderPageRoutingModule {}
