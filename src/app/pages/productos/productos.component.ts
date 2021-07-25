import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Articulo } from '@app/interface/articulo.interface';
import { ProductosService } from '@app/service/productos.service';
import { environment } from '@environments/environment.prod';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  @ViewChild("myModalInfo", { static: false }) myModalInfo: TemplateRef<any>;

  articulo: Articulo;
  imagen = "";

  /// esto lo creo Ruslan.
  articulos$: Observable<Articulo[]> = this.prodcSrv.getAll();

  constructor(
    private prodcSrv: ProductosService,
    private route: Router,
    private modalService: NgbModal,
  ) {
    //this.list();
  }

  formulario = new FormGroup({
    id: new FormControl('', Validators.required),
    cod_Articulo: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    medida: new FormControl('', Validators.required),
    cod_Proveedor: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required)
  });

  ngOnInit(): void { }

  // list() {
  //   this.prodcSrv.getAll()
  //     .pipe(
  //       tap(resp => {
  //         localStorage.setItem("articulos", JSON.stringify(resp));
  //       })
  //     )
  //     .subscribe();
  // }

  /// con esto solucione el problema de que no mostraba en el Modal los datos 
  onEditArticulo(data: Articulo) {
    this.modalService.open(this.myModalInfo);
    const { id } = data;
    this.prodcSrv.getById(id)
      .pipe(
        tap(resp => {
          this.formulario.setValue(resp);
        })
      )
      .subscribe();
  };


  onUpdate() {
    const datos = this.formulario.value;
    if (this.formulario.valid) {
      // Hacer un mapping de los cambios. (LEER SOBRE "AUTOMAPPERS")
      this.prodcSrv.update(datos).subscribe(res => {
        alert(`Respuesta -> ${res}`);
      })
    }
    /// no refresh la pagina
    this.route.navigate(["/productos"]);

  }

  onNew(): void {
    this.route.navigate(['/articulo']);
  }

  onDeleteArticulo(data: Articulo): void {
    const { id } = data;
    let mensaje = "Esta seguro ?";

    if (confirm(mensaje)) {
      this.prodcSrv.delete(id).subscribe(articuloEliminado => {

        if (articuloEliminado.status == 200) {
          alert(`Respuesta : => ${articuloEliminado.message}`);
        } else {
          alert(`Respuesta : => ${articuloEliminado.message}`);
        }
        /// no refresh la pagina
        this.route.navigate(["/productos"]);
      });
    }
  }

  get urlImage() {
    if (this.articulo) {
      return this.prodcSrv.getImg(this.articulo.cod_Articulo);
    }
  }

  onImageError(event: any) {
    event.target.src = '/assets/images/sin-foto.jpg';
  }

}
