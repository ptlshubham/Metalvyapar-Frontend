import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'imageViewer',
    component: ImageViewerComponent
  },
  {
    path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
  },
  {
    path: 'trade-list', loadChildren: () => import('./trading-list/trading-list.module').then(m => m.TradingListModule)
  },
  {
    path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule)
  },
  {
    path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
