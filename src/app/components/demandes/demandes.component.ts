import { Component, OnInit,inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { DatePipe, NgClass, NgFor } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router, RouterModule } from '@angular/router';
import { SelectionType } from '@swimlane/ngx-datatable';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  DemandeService } from '../../services/demande.service';
import { Demande } from '../../model/Demande.model';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-demandes',
  imports: [NavbarComponent,NgxDatatableModule,DatePipe,NgClass,RouterModule,ReactiveFormsModule],
  templateUrl: './demandes.component.html',
  styleUrl: './demandes.component.css'
})
export class DemandesComponent implements OnInit {
  http = inject(HttpClient);

  demandeForm!: FormGroup;
  message = '';
  messageType: 'success' | 'error' | '' = '';


constructor(private router: Router,private fb: FormBuilder,private demandeService: DemandeService) {}
selectionType = SelectionType.single;

  errorMessage: string = '';
  
  Editmessage: string = ''; // Variable to store the message
  EditmessageType: string = ''; // success or error
  columns = [
    { name: 'ID', prop: 'id' },
    { name: 'Immatriculation', prop: 'immat' },
    { name: 'Marque/Modèle', prop: 'marque' },
    { name: 'Fournisseur', prop: 'fournisseur' },
    { name: 'Motif immobilisation', prop: 'motifImmo' },
    { name: 'Date début', prop: 'dateDebut' },
    { name: 'Date fin', prop: 'dateFin' },
    { name: 'Durée', prop: 'duree' },
    { name: 'Client', prop: 'client' },
    { name: 'Créateur de la demande', prop: 'createurDemande' },
    { name: 'Date clôture', prop: 'dateCloture' },
    { name: 'Statut', prop: 'statut' },
    { name: 'Kilométrage', prop: 'km' },
    { name: 'Numéro chassi', prop: 'nChassi'},
    { name: 'Société', prop: 'statutFrn' },
    { name: 'Position Contrat', prop: 'positionContrat' },
    { name: 'Ville', prop: 'ville' },
    { name: 'GSM', prop: 'gsm' },
    { name: 'Email', prop: 'email' },
    { name: 'Date probleme', prop: 'dateProbleme' },
    { name: 'Traiteur de la demande', prop: 'traiteurdemand' },
  ];
  page = 1;
  pageSize = 10;
  totalRecords = 0;
  searchTerm: string = ''; // Initialize search term
  
rows: Demande[] = [];

onRowClick(row: any) {
  if (row?.id) {
    this.router.navigate(['/demandes', row.id]);
  } else {
    console.error('ID manquant pour la demande:', row);
  }
}
 ngOnInit() {
    this.demandeForm = this.fb.group({
      // Section Demande
      numeroDemande: ['', Validators.required],
      fournisseur: [''],
      createurDemande: [''],
      statut: [''],
      dateProbleme: [''],
      traiteurdemand: [''],

      // Section Véhicule
      immat: ['', Validators.required],
      marque: [''],
      km: [''],
      nChassi: [''],
      statutFrn: [''],

      // Section Immobilisation & Dates
      motifImmo: [''],
      dateDebut: [''],
      dateFin: [''],
      duree: [''],
      dateCloture: [''],

      // Section Client & Contact
      client: [''],
      positionContrat: [''],
      ville: [''],
      gsm: [''],
      email: ['', Validators.email],
    });
    this.loadDemandes(); // ← Load from backend
  }
  loadDemandes() {
  this.demandeService.getAll().subscribe({
    next: (data: string | any[]) => {
      if (Array.isArray(data)) {
        this.rows = data as Demande[];
        this.totalRecords = data.length;
      } else {
        this.rows = [];
        this.totalRecords = 0;
        this.errorMessage = 'Erreur: données inattendues reçues du backend.';
        console.error('Données inattendues:', data);
      }
    },
    error: (err) => {
      this.errorMessage = 'Erreur lors du chargement des demandes';
      console.error(err);
    }
  });
}
  onSubmit() {
  if (this.demandeForm.valid) {
    const demande: Demande = this.demandeForm.value;

    this.demandeService.create(demande).subscribe({
      next: (res) => {
        this.message = 'Demande ajoutée avec succès !';
        this.messageType = 'success';
        this.demandeForm.reset();
        this.loadDemandes(); // Reload list
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout de la demande :', err);
        this.message = 'Erreur lors de l’ajout.';
        this.messageType = 'error';
      }
    });
  } else {
    this.message = 'Merci de remplir les champs obligatoires.';
    this.messageType = 'error';
  }
}

  
}


