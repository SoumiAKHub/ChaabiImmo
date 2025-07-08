import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  imports: [],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {
  constructor(private router :Router) {}

    getAuth()
  {
    
        this.router.navigate(['/home']);
        console.log();
      
  }


}
