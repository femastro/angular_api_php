import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Articulo } from '@app/interface/articulo.interface';
import { ProductosService } from '@app/service/productos.service';
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
  ) { }

  formulario = new FormGroup({
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    medida: new FormControl('', Validators.required),
    cod_Proveedor: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.list();
    // console.log("this.articulos : ", this.articulos)
  }

  list() {
    this.prodcSrv.getAll()
      .pipe(
        tap(resp => {
          localStorage.setItem("articulos", JSON.stringify(resp));
        })
      )
      .subscribe();
  }

  /// con esto solucione el problema de que no mostraba en el Modal los datos 
  onEditArticulo(data: Articulo) {
    this.modalService.open(this.myModalInfo);
    const { id } = data;
    const articulos = JSON.parse(localStorage.getItem("articulos"));
    articulos.forEach(element => {
      if (element["id"] == id) {
        this.articulo = element;
      }
    });
  }

  onUpdate() {
    const datos = this.formulario.value;

    if (this.formulario.valid) {
      // Hacer un mapping de los cambios. (LEER SOBRE "AUTOMAPPERS")
      this.prodcSrv.update(datos).subscribe(res => {
        alert(res);
      })
    }

    this.list();

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

        // this.list(); // FIXME: retrieve products when something changed
      }
      );
    }
  }

  get urlImage() {
    if (this.articulo) {
      //return `${environment.apiUrl}/${this.articulo.cod_Articulo}.jpg`;
      return `/assets/images/${this.articulo.cod_Articulo}.jpg`;
    }
  }

  onImageError(event: any) {
    event.target.src = '/assets/images/sin-foto.jpg';
  }

}
