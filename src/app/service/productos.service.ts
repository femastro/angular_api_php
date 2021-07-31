import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articulo, Formulario } from '@app/interface/articulo.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  constructor(private http: HttpClient) { }

  getNeumaticos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${environment.apiAll}`)
  }

  getMarcas() {
    return this.http.get(`${environment.apiAll}/marcas`)
  }

  getModelos(data: Formulario): Observable<Formulario[]> {
    return this.http.post<Formulario[]>(`${environment.apiAll}/modelos`, data)
  }

  getMedidas(data: Formulario): Observable<Formulario[]> {
    return this.http.post<Formulario[]>(`${environment.apiAll}/medidas`, data)
  }

  getAll(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${environment.apiRest}`)
  }

  getById(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${environment.apiRest}/${id}`)
      .pipe(map(articulo => {
        return articulo[0];
      }))
  }

  delete(id: number) {
    return this.http.delete<any>(`${environment.apiRest}/delete/${id}`);
  }

  save(data) {
    return this.http.post(`${environment.apiRest}/new`, data);
  }

  saveImage(file: FormData): Observable<any> {
    return this.http.post(`${environment.apiCloudinary}`, file);
  }

  // eliminarImagen(data: string) {

  // }

  update(data: Articulo) {
    const { id } = data;
    return this.http.put(`${environment.apiRest}/update/${id}`, data);
  }

}
