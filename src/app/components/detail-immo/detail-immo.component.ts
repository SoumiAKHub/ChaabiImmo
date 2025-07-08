import { Component ,AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { ARTICLES_DAMMAGES, ArticleDommage } from '../../model/articles.constants';
import { Lightbox,LightboxModule  } from 'ngx-lightbox';
import { DemandeService } from '../../services/demande.service';

@Component({
  selector: 'app-detail-immo',
  imports: [NavbarComponent,FormsModule,NgFor,NgIf,LightboxModule],
  templateUrl: './detail-immo.component.html',
  styleUrl: './detail-immo.component.css'
})
export class DetailImmoComponent{
  allDemandes: any;
  selectedDemande: any;
 constructor(private route: ActivatedRoute ,private cd: ChangeDetectorRef,private lightbox: Lightbox, private demandeService: DemandeService) {}
  
  
demandeId: number =0; ;
  demande: any;
//declaration des inputs
// Ici tu peux déclarer les propriétés liées aux inputs, par exemple :
  immat: string = '';
  marque: string = '';
  km: string = '';
  nChassi: string = '';
  societe: string = '';
  dateProbleme: string = '';
  createurDemande: string = '';
  traiteurdemand: string = '';
  client: string = '';
  positionContrat: string = '';
  ville: string = '';
  gsm: string = '';
  email: string = '';
  /**detail demande */
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.demandeId = idParam ? Number(idParam) : 0;
    console.log('Demande ID from route:', this.demandeId);
    if (this.demandeId) {
      this.getDemandeById(this.demandeId);
    }
   /* console.log('Demande:', this.demande.immat);
    this.immat = this.demande.immat;                      // '5678-CD'
this.marque = this.demande.marque;             // 'Peugeot 208'
this.societe = this.demande.fournisseur;             // 'Fournisseur B'
this.dateProbleme = this.demande.dateDebut;          // Date('2025-06-05')
this.createurDemande = this.demande.createurDemande;  // 'Sara'
this.client = this.demande.client;                    // 'Client Y'

this.km = this.demande.km;
this.nChassi = this.demande.nChassi;
this.traiteurdemand = this.demande.traiteurdemande;
this.positionContrat = this.demande.positionContrat;
this.ville = this.demande.ville;
this.gsm = this.demande.gsm;
this.email = this.demande.email; */
  }
  getDemandeById(id: number): void {
    this.demandeService.getById(id).subscribe({
      next: (data: any) => {
        this.selectedDemande = data;
        console.log('Demande fetched:', data);
        console.log('Immat:', this.selectedDemande.immat); // ✅ safe now
      },
      error: (err: any) => {
        console.error('Error fetching demande:', err);
      }
    });
  }
  editMode: boolean = false;

toggleEditMode(): void {
  this.editMode = true;
}

cancelEdit(): void {
  this.editMode = false;
  // Optionally reload the original demande to discard changes
}
updateDemande(): void {
    this.demandeService.update(this.demandeId, this.selectedDemande).subscribe({
      next: (updated) => {
        console.log('Demande mise à jour avec succès', updated);
        this.editMode = false;
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
      }
    });
  }
  /**fin detail demande */
  /*gestion des degats*/ 
  articles: ArticleDommage[] = ARTICLES_DAMMAGES;
  listeDegats: any[] = [];

  // Pour ajout
  nouveauDegat = { article: '', nature: '', galerie: [] as string[] };
  naturesDisponiblesAjout: string[] = [];

  // Pour modification
  degatAModifier = { article: '', nature: '', galerie: [] as string[] };
  naturesDisponiblesModif: string[] = [];
  indexAModifier: number | null = null;

  // Lors de sélection d’un article dans l'ajout
  onArticleSelectedAjout(articleNom: string) {
    const article = this.articles.find(a => a.nom === articleNom);
    this.naturesDisponiblesAjout = article?.natures ?? [];
    this.nouveauDegat.nature = '';
  }

  // Lors de sélection d’un article dans la modif
  onArticleSelectedModif(articleNom: string) {
    const article = this.articles.find(a => a.nom === articleNom);
    this.naturesDisponiblesModif = article?.natures ?? [];
    this.degatAModifier.nature = '';
  }

  ajouterDegat() {
    if (this.nouveauDegat.article && this.nouveauDegat.nature) {
      this.listeDegats.push({ ...this.nouveauDegat });
      this.nouveauDegat = { article: '', nature: '', galerie: [] as string[] };
      this.naturesDisponiblesAjout = [];
    }
  }

  ouvrirModalModification(index: number) {
    const selected = this.listeDegats[index];
    this.indexAModifier = index;
    this.degatAModifier = { ...selected };
    this.onArticleSelectedModif(selected.article);
  }

  modifierDegat() {
    if (this.indexAModifier !== null) {
      this.listeDegats[this.indexAModifier] = { ...this.degatAModifier };
      this.indexAModifier = null;
      this.naturesDisponiblesModif = [];
    }
  }
  /**gestion de la gallerie */
  degatEnGalerie: any = null;
  imagePreviewUrls: string[] = [];

  ouvrirGalerie(index: number) {
    this.degatEnGalerie = this.listeDegats[index];
    this.imagePreviewUrls = this.degatEnGalerie.galerie || [];
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.degatEnGalerie.galerie = this.degatEnGalerie.galerie || [];
        this.degatEnGalerie.galerie.push(imageUrl);
        this.imagePreviewUrls = [...this.degatEnGalerie.galerie];
      };
      reader.readAsDataURL(file);
    }
  }
  /**fin gestion gallerie */
  /*fin gestion degats*/

 /**gestion des images  */
 imagesSection: any[] = [];

  

  onAddImageSection(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;

        // Push image to ngx-lightbox format
        this.imagesSection.push({
          src: url,
          thumb: url,
          caption: 'Uploaded Image'
        });
      };
      reader.readAsDataURL(file);
    }
  }

  openImage(index: number): void {
    this.lightbox.open(this.imagesSection, index);
  }

 /**fin gestion des images  */























}
