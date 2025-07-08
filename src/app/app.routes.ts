import { Routes } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { HomeComponent } from './components/home/home.component';
import { DemandesComponent } from './components/demandes/demandes.component';
import { DetailImmoComponent } from './components/detail-immo/detail-immo.component';


export const routes: Routes = [
      {
        path:'',
        component: AuthentificationComponent  // Default route
      },
      {
        path:'login',
        component: AuthentificationComponent  // Default route
      },
      {
        path:'home',
        component: HomeComponent  
      },
      {
        path:'demandes',
        component: DemandesComponent
      },
      {
        path:'demandes/:id',
        component: DetailImmoComponent
      },

      
];