import { NgClass, NgFor, NgIf, NgStyle} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- Ajoute ceci
import { NavbarComponent } from '../navbar/navbar.component';
interface Demande {
  nmission: string;
  immat: string;
  modele: string;
  client: string;
  datePrevue: string | null;
  statutDigital: number;
  nature: string;
  nDemande: number;
}
@Component({
  selector: 'app-home',
  imports: [NgFor,NgIf,NgStyle,FormsModule,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
isLoading = true;
  dateFiltre: string = new Date().toISOString().split('T')[0];
  demandes: Demande[] = [];

  ngOnInit(): void {
    console.log('HomeComponent ngOnInit');
    this.loadData();
  }

  loadData() {
    console.log('HomeComponent load data');
    this.isLoading = true;

    // Ici tu remplaces ça par un appel API réel à ton backend
    setTimeout(() => {
      this.demandes = [
        {
          nmission: 'MS001',
          immat: '1234ABC',
          modele: 'Peugeot 208',
          client: 'Société X',
          datePrevue: '2025-07-02T10:00',
          statutDigital: 1,
          nature: 'Prestation',
          nDemande: 101
        },
        {
          nmission: 'MS002',
          immat: '5678XYZ',
          modele: 'Renault Clio',
          client: 'Client Y',
          datePrevue: null,
          statutDigital: 4,
          nature: 'LivraisonVN',
          nDemande: 102
        },
        {
          nmission: 'MS002',
          immat: '5678XYZ',
          modele: 'Renault Clio',
          client: 'Client Y',
          datePrevue: null,
          statutDigital: 3,
          nature: 'LivraisonVN',
          nDemande: 102
        },
        {
          nmission: 'MS002',
          immat: '5678XYZ',
          modele: 'Renault Clio',
          client: 'Client Y',
          datePrevue: null,
          statutDigital: 2,
          nature: 'LivraisonVN',
          nDemande: 102
        },
        {
          nmission: 'MS002',
          immat: '5678XYZ',
          modele: 'Renault Clio',
          client: 'Client Y',
          datePrevue: null,
          statutDigital:1 ,
          nature: 'LivraisonVN',
          nDemande: 102
        },
        {
          nmission: 'MS002',
          immat: '5678XYZ',
          modele: 'Renault Clio',
          client: 'Client Y',
          datePrevue: null,
          statutDigital: 3,
          nature: 'LivraisonVN',
          nDemande: 102
        },
        {
          nmission: 'MS002',
          immat: '5678XYZ',
          modele: 'Renault Clio',
          client: 'Client Y',
          datePrevue: null,
          statutDigital: 2,
          nature: 'LivraisonVN',
          nDemande: 102
        },
        {
          nmission: 'MS002',
          immat: '5678XYZ',
          modele: 'Renault Clio',
          client: 'Client Y',
          datePrevue: null,
          statutDigital:1 ,
          nature: 'LivraisonVN',
          nDemande: 102
        }
      ];

      this.isLoading = false;
    }, 1000);
  }

  getColor(statut: number): string {
    // Mappe les couleurs selon ton ancienne classe Java StatutProp
    switch (statut) {
      case 1: return '#28a745'; // success
      case 2: return '#ffc107'; // warning
      case 3: return '#dc3545'; // danger
      case 4: return '#6c757d'; // danger
      default: return '#6c757d'; // secondary
    }
  }

  pageSize = 5;
currentPage = 1;

get paginatedDemandes() {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.demandes.slice(start, start + this.pageSize);
}

get totalPages() {
  return Math.ceil(this.demandes.length / this.pageSize);
}

get totalPagesArray() {
  return Array(this.totalPages).fill(0).map((_, i) => i + 1);
}

goToPage(page: number) {
  this.currentPage = page;
}

previousPage() {
  if (this.currentPage > 1) this.currentPage--;
}

nextPage() {
  if (this.currentPage < this.totalPages) this.currentPage++;
}


}
