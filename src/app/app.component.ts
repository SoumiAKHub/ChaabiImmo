import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LightboxModule } from 'ngx-lightbox';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LightboxModule,HttpClientModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Immobilisation';
  
}
