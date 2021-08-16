import { ContainerComponent } from './shared/container/container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from '@shared/guard/auth.guard'

const routes: Routes = [
  { 
    path: '', 
    component: ContainerComponent,
 
    children:[
      {
        path: '',
        redirectTo : 'login',
        pathMatch : 'full'
      },
      { 
        path: 'login', 
        loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
      },
      { 
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) 
      }, 
      { 
        path: 'productos', 
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosModule),
      },
      { 
        path: 'articulo', 
        loadChildren: () => import('./pages/articulo/articulo.module').then(m => m.ArticuloModule) 
      }
  ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
