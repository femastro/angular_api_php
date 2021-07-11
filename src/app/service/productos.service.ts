import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articulo } from '@app/interface/articulo.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${environment.apiRest}`)
  }

  getById(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${environment.apiRest}/${id}`)
      .pipe(map(articulo => articulo[0]))
  }

  delete(id: number) {
    return this.http.delete<any>(`${environment.apiRest}/delete/${id}`);
  }

  save(data: Articulo) {
    return this.http.post(`${environment.apiRest}/nuevo`, data);
  }
}
