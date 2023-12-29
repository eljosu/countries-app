import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { HomePageComponent } from './shared/pages/homePage/homePage.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: HomePageComponent
  // },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule )
    // Esto se hace para hacer la carga perezosa de ese modulo.
    // Carga perezosa es que solo se carga cuando se necesita.
    // Asi cargamos el CountriesModule, que a su vez esta cargando dentro el CountriesRoutingModule
    // Lo que se importa es el path, se convierte en una promesa. La m es simbolo de modulo que vamos a cargar
  },
  {
    path: '**',
    redirectTo: 'countries'
  }
];

//Se pone forRoot porque este modulo de router esta en la raiz del proyecto y es el primero que hacemos
//Si no fuese el primero, o si no estuviese en la raiz, se pondria forChild
@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
  ],
  exports: [
    RouterModule
  ],
  // declarations: [NameComponent],
  // providers: [],
})
export class AppRoutingModule { }
