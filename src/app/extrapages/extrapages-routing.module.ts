import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceComponent } from './maintenance/maintenance.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ContactComponent } from './contact/contact.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const routes: Routes = [
    {
        path: 'maintenance',
        component: MaintenanceComponent
    },
     {
        path: 'register',
        component: UserRegisterComponent
    },
    {
        path: 'contact-us',
        component: ContactComponent
    },
    {
        path: '404',
        component: Page404Component
    },
    // for wild card routing
    {
        path: "**",
        component: Page500Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ExtrapagesRoutingModule { }
