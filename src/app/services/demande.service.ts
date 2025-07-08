import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Demande } from '../model/Demande.model';
// 👇 Define your model (adapt or import it if you have a separate interface)


@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private apiUrl = 'http://localhost:9191/api/demandes'; // adapt this if needed

  constructor(private http: HttpClient) {}

  // ✅ Get all demandes
  getAll(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.apiUrl);
  }

  // ✅ Get one demande by ID
  getById(id: number): Observable<Demande> {
    return this.http.get<Demande>(`${this.apiUrl}/${id}`);
  }

  // ✅ Create a new demande
  create(demande: Demande): Observable<Demande> {
    return this.http.post<Demande>(this.apiUrl, demande);
  }

  // ✅ Update a demande
  update(id: number, demande: Demande): Observable<Demande> {
    return this.http.put<Demande>(`${this.apiUrl}/${id}`, demande);
  }

  // ✅ Delete a demande
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
